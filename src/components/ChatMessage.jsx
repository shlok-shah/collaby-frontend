import { Box, Text, HStack, Avatar, Flex, Divider, useColorModeValue } from "@chakra-ui/react";

const ChatMessage = ({ message, name }) => {
	const fontColor = useColorModeValue("black", "white");
	return (
		<Flex alignItems="center" gap={3} maxW="100%">
			<Avatar name={name} />
			<Flex alignItems="flex-start" m={3} flexDirection="column">
				<Text color={fontColor} fontWeight={600}>
					{name}
				</Text>
				<Box borderRadius="lg" color="black">
					<Text color={fontColor}>{message}</Text>
				</Box>
			</Flex>
		</Flex>
	);
};

export default ChatMessage;

// Chat Input Component
