import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import profilePic from "../assets/profileImage.svg";
import notification from "../assets/notification.svg";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <Box as="nav">
      <HStack width="100%">
        <Flex width="100%" justifyContent="space-between">
          <Link to="/profile">
            <Flex gap="1rem">
              <Image src={profilePic} alt="profile picture" />
              <Flex flexDirection="column" textAlign="justify">
                <Text color="#24133F" fontWeight="500" fontSize="1.5rem">
                  User1343
                </Text>
                <Text
                  color="rgba(36, 19, 63, 0.70)"
                  fontSize="1rem"
                  fontWeight="300">
                  Go to profile
                </Text>
              </Flex>
            </Flex>
          </Link>
          <Image src={notification} alt="notification" />
        </Flex>
      </HStack>
    </Box>
  );
};

export default Nav;
