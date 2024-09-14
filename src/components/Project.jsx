import { Box, Flex } from "@chakra-ui/react";
import ChatBox from "./ChatBox";
import TextEditor from "./TextEditor";

const Project = () => {
	return (
		<Flex w="100%" h="100vh">
			<Box w="20%" bg="green" h="100vh">
				<ChatBox />
			</Box>
			<Box w="80%" h="100vh" bg="gray.100" color="black">
				<TextEditor />
			</Box>
		</Flex>
	);
};

export default Project;
