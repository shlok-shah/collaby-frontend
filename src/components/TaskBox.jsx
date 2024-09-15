import {
	VStack,
	Box,
	Divider,
	useToast,
	Heading,
	Avatar,
	Flex,
	Text,
	Modal,
	useDisclosure,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	FormControl,
	FormLabel,
	Input,
	Button,
	ModalFooter,
	Select,
	Textarea,
	Fade,
} from "@chakra-ui/react";
import { useState, useContext, useEffect, useRef } from "react";
import { MainContext } from "../mainContext";
import { UsersContext } from "../usersContext";
import { SocketContext } from "../socketContext";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useNavigate } from "react-router-dom";
import { TbAsterisk } from "react-icons/tb";

const TaskBox = () => {
	const { name, room, setName, setRoom } = useContext(MainContext);
	const socket = useContext(SocketContext);
	const [tasks, setTasks] = useState([]);
	const { users } = useContext(UsersContext);
	const navigate = useNavigate();
	const toast = useToast();
	const [description, setDescription] = useState("");
	const [assigned, setAssigned] = useState("");

	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		socket.on("initialize-tasks", (tasks) => {
			setTasks(tasks);
		});

		socket.on("new-task", (task) => {
			setTasks((tasks) => [...tasks, task]);
		});

		socket.on("complete-task", ({ _id }) => {
			setTasks((tasks) => tasks.filter((task) => task._id != _id));
		});

		return () => {
			socket.off("new-task");
			console.log("new-task disconnected");
		};
	}, [socket]);

	useEffect(() => {
		socket.connected && socket.emit("initialize-tasks", { room });

		return () => {
			socket.off("initialize-tasks");
			console.log("Cleaned up on Task component unmount");
		};
	}, [room, name]);

	const handleClick = () => {
		socket.emit("new-task", { room, description, assigned });
		setDescription("");
		setAssigned("");
	};

	const handleComplete = (e) => {
		const _id = e.target.value;
		socket.emit("complete-task", { room, _id });
	};

	return (
		<>
			<VStack border="1px solid" w="100%" h="100vh" overflow="hidden" spacing="0">
				<Flex bg="blue.500" color="white" p={4} align="center" w="100%" h="10vh" justify="space-between">
					<Heading size="md">Task Panel</Heading>
					<Button onClick={onOpen}>Add Task</Button>
				</Flex>
				<Box h="90vh" w="100%" overflowY="scroll" bg="gray.50">
					{tasks.map((task) => (
						<Fade in={true} key={task._id}>
							<Box color="black" bg="gray.300" p={3}>
								<Flex justifyContent="space-between">
									<Box>
										<Text>@{task.assigned}</Text>
										<Text>{task.description}</Text>
									</Box>
									<Button onClick={handleComplete} value={task._id} bg="blue.500">
										Done
									</Button>
								</Flex>
							</Box>
						</Fade>
					))}
				</Box>
			</VStack>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add new task</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Assigned To</FormLabel>
							<Select
								value={assigned}
								onChange={(e) => setAssigned(e.target.value)}
								placeholder="Select User">
								{users.map((user, i) => {
									return (
										<option value={user.name} key={i}>
											{user.name}
										</option>
									);
								})}
							</Select>
						</FormControl>
						<FormControl mt={4} isRequired>
							<FormLabel>Description</FormLabel>
							<Textarea
								placeholder="Description"
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleClick}>
							Add
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default TaskBox;
