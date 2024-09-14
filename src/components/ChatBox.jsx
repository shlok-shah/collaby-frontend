import { VStack, Box, Divider, useToast } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { MainContext } from "../mainContext";
import { UsersContext } from "../usersContext";
import { SocketContext } from "../socketContext";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useNavigate } from "react-router-dom";

const ChatBox = () => {
	const { name, room, setName, setRoom } = useContext(MainContext);
	const socket = useContext(SocketContext);
	const [messages, setMessages] = useState([]);
	const { users } = useContext(UsersContext);
	const navigate = useNavigate();
	const toast = useToast();

	window.onpopstate = (e) => logout();

	useEffect(() => {
		if (!name) return navigate("/");
	}, [navigate, name]);

	useEffect(() => {
		socket.on("message", (msg) => {
			console.log("yaay new message");
			setMessages((messages) => [...messages, msg]);
		});

		socket.on("notification", (notif) => {
			toast({
				position: "top",
				title: notif?.title,
				description: notif?.description,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		});
	}, [socket, toast]);

	const handleSendMessage = (message) => {
		console.log("sending...");
		socket.emit("sendMessage", message);
	};

	const logout = () => {
		setName("");
		setRoom("");
		navigate("/", { replace: true });
	};

	return (
		<VStack border="1px solid" w="100%" h="100vh" overflow="hidden" spacing="0">
			<ChatHeader />
			<Box h="80vh" p={3} w="100%" overflowY="scroll" bg="gray.50">
				{messages.map((msg, index) => (
					<Box key={index}>
						<ChatMessage message={msg.text} name={msg.name} />
						<Divider bg="gray.400" />
					</Box>
				))}
			</Box>
			<ChatInput onSend={handleSendMessage} />
		</VStack>
	);
};

export default ChatBox;
