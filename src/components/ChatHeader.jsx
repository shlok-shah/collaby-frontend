import { Flex, Avatar, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { MainContext } from "../mainContext";
const ChatHeader = () => {
	const { name, setName, room, setRoom } = useContext(MainContext);

	return (
		<Flex bg="blue.500" color="white" p={4} align="center" w="100%" h="10vh" justify="space-between">
			<Heading size="md">Chat with team</Heading>
			{console.log(name)}
			<Avatar name={name} />
		</Flex>
	);
};

export default ChatHeader;
