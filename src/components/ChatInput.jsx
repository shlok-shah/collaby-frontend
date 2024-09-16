import { HStack, Input, Button, useColorModeValue, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

const ChatInput = ({ onSend }) => {
	const [input, setInput] = useState("");
	const formBackground = useColorModeValue("blue.500", "gray.700");
	const theBackground = useColorModeValue("gray.200", "gray.600");
	const fontColor = useColorModeValue("black", "white");

	const handleSend = () => {
		if (input.trim()) {
			onSend(input);
			setInput(""); // Clear the input after sending
		}
	};

	const handleKeyDown = (event) => {
		if (event.key == "Enter") {
			handleSend();
		}
	};

	return (
		<HStack spacing={3} h="10vh" bg={formBackground} w="100%" p={3}>
			<Input
				value={input}
				color={fontColor}
				bg={theBackground}
				onKeyDown={handleKeyDown}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Type your message"
			/>
			<Button colorScheme="blue" onClick={handleSend}>
				<Text>Send</Text>
			</Button>
		</HStack>
	);
};

export default ChatInput;
