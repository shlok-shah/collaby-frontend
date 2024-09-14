import { HStack, Input, Button } from "@chakra-ui/react";
import { useRef, useState } from "react";

const ChatInput = ({ onSend }) => {
	const [input, setInput] = useState("");

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
		<HStack spacing={3} h="10vh" bg="blue.500" w="100%" p={3}>
			<Input
				value={input}
				color="black"
				bg="white"
				onKeyDown={handleKeyDown}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Type your message"
			/>
			<Button colorScheme="blue" onClick={handleSend}>
				Send
			</Button>
		</HStack>
	);
};

export default ChatInput;
