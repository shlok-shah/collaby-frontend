import { Flex, Avatar, Heading, useColorModeValue } from "@chakra-ui/react";
import { useContext } from "react";
import { MainContext } from "../mainContext";
const ChatHeader = () => {
	const { name, setName, room, setRoom } = useContext(MainContext);

	const formBackground = useColorModeValue("blue.500", "gray.700");
	const theBackground = useColorModeValue("gray.200", "gray.600");

	return (
		<Flex bg={formBackground} color="white" p={4} align="center" w="100%" h="10vh" justify="space-between">
			<Heading size="md">Chat with team</Heading>
			{console.log(name)}
			<Avatar name={name} />
		</Flex>
	);
};

export default ChatHeader;
