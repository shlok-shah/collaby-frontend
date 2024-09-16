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
	PinInput,
	PinInputField,
	HStack,
	Text,
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
	const formBackground = useColorModeValue("gray.200", "gray.700");
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
				<FormControl isRequired>
					<HStack alignSelf="center" mb={3}>
						<Text>Room code:</Text>

						<PinInput
							variant="filled"
							type="alphanumeric"
							value={room}
							onChange={(value) => setRoom(value.toUpperCase())}>
							<PinInputField />
							<PinInputField />
							<PinInputField />
							<PinInputField />
						</PinInput>
					</HStack>
				</FormControl>
				<Button colorScheme="teal" mb={8} onClick={handleClick}>
					Join
				</Button>
				<FormControl display="flex" alignItems="center" justifyContent="center">
					<FormLabel htmlFor="dark_mode" mb="0">
						Toggle Dark Mode?
					</FormLabel>
					<Switch id="dark_mode" colorScheme="teal" size="lg" onChange={toggleColorMode} />
				</FormControl>
			</Flex>
		</Flex>
	);
};

export default Login;
