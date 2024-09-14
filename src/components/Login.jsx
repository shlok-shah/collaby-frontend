import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Flex,
	Heading,
	Input,
	Button,
	FormControl,
	FormLabel,
	Switch,
	useColorMode,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { SocketContext } from "../socketContext";
import { UsersContext } from "../usersContext";
import { MainContext } from "../mainContext";

const Login = () => {
	const socket = useContext(SocketContext);
	const { name, setName, room, setRoom } = useContext(MainContext);
	const navigate = useNavigate();
	const toast = useToast();
	const { setUsers } = useContext(UsersContext);

	const { toggleColorMode } = useColorMode();
	const formBackground = useColorModeValue("gray.100", "gray.700");
	const theBackground = useColorModeValue("gray.300", "gray.600");

	useEffect(() => {
		socket.on("users", (users) => {
			console.log("yo");
			setUsers(users);
		});
	}, []);

	const handleClick = () => {
		socket.emit("login", { name, room }, (error) => {
			if (error) {
				console.log(error);
				return toast({
					position: "top",
					title: "Error",
					description: error,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
			navigate("/project");
			return toast({
				position: "top",
				title: "Hey there",
				description: `Welcome to ${room}`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		});
	};

	return (
		<Flex h="100vh" w="100%" alignItems="center" justifyContent="center" bg={theBackground}>
			<Flex flexDirection="column" bg={formBackground} p={12} borderRadius={8} boxShadow="lg">
				<Heading mb={6}>Join Room</Heading>
				<Input
					placeholder="Username"
					type="text"
					variant="filled"
					mb={3}
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					placeholder="Room No."
					type="number"
					variant="filled"
					mb={3}
					value={room}
					onChange={(e) => setRoom(e.target.value)}
				/>
				<Input placeholder="Password" type="password" variant="filled" mb={6} />
				<Button colorScheme="teal" mb={8} onClick={handleClick}>
					Join
				</Button>
				<FormControl display="flex" alignItems="center">
					<FormLabel htmlFor="dark_mode" mb="0">
						Enable Dark Mode?
					</FormLabel>
					<Switch id="dark_mode" colorScheme="teal" size="lg" onChange={toggleColorMode} />
				</FormControl>
			</Flex>
		</Flex>
	);
};

export default Login;
