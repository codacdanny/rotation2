import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import profilePic from "../assets/profileImage.svg";
import notification from "../assets/notification.svg";
const Nav = () => {
  return (
    <Box as="nav">
      <HStack width="100svw">
        <Flex width="100%" justifyContent="space-between">
          <Flex gap="1rem">
            <Image src={profilePic} alt="profile picture" />
            <Flex flexDirection="column" textAlign="justify">
              <Text>User1343</Text>
              <Text>Go to profile</Text>
            </Flex>
          </Flex>
          <Image src={notification} alt="notification" />
        </Flex>
      </HStack>
    </Box>
  );
};

export default Nav;
