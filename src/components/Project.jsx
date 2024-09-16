import { Box, Flex, useColorMode, useColorModeValue } from "@chakra-ui/react";
import ChatBox from "./ChatBox";
import TextEditor from "./TextEditor";
import TaskBox from "./TaskBox";

const Project = () => {
	const theBackground = useColorModeValue("white", "#353d4a");
	const fontColor = useColorModeValue("black", "white");

	return (
		<Flex w="100%" h="100vh">
			<Box w="20%" bg="green" h="100vh">
				<ChatBox />
			</Box>
			<Box w="60%" h="100vh" bg={theBackground} color={fontColor}>
				<TextEditor />
			</Box>
			<Box w="20%" bg="green" h="100vh">
				<TaskBox />
			</Box>
		</Flex>
	);
};

export default Project;
