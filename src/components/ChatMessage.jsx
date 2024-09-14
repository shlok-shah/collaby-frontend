import { Box, Text, HStack, Avatar, Flex, Divider } from "@chakra-ui/react";

const ChatMessage = ({ message, name }) => {
	return (
		<Flex alignItems="center" gap={3} maxW="100%">
			<Avatar />
			<Flex alignItems="flex-start" m={3} flexDirection="column">
				<Text color="black" fontWeight={600}>
					{name}
				</Text>
				<Box borderRadius="lg" color="black">
					<Text>{message}</Text>
				</Box>
			</Flex>
		</Flex>
	);
};

export default ChatMessage;

// Chat Input Component
