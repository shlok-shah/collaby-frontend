import { Box, Flex } from "@chakra-ui/react";
import ChatBox from "./ChatBox";
import TextEditor from "./TextEditor";
import TaskBox from "./TaskBox";

const Project = () => {
	return (
		<Flex w="100%" h="100vh">
			<Box w="20%" bg="green" h="100vh">
				<ChatBox />
			</Box>
			<Box w="60%" h="100vh" bg="gray.100" color="black">
				<TextEditor />
			</Box>
			<Box w="20%" bg="green" h="100vh">
				<TaskBox />
			</Box>
		</Flex>
	);
};

export default Project;
