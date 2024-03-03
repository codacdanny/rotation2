import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Page_Backround from "../Major_Components/Page_Background";
import profile from "../assets/profileImage.svg";

const ProfilePage = () => {
  return (
    <Page_Backround>
      <Flex color="#24133F" flexDirection="column">
        <Flex
          alignItems="center"
          textAlign="center"
          color="#24133F"
          flexDirection="column"
          gap=".7rem">
          <Heading fontSize="1.5rem">Profile</Heading>
          <Image
            src={profile}
            alt="profile picture"
            boxSize="fit-content"
            objectFit="cover"
            height="6rem"
          />
          <Heading fontSize="2rem"> UserID </Heading>
          <Text>Highest level Attained: level 3</Text>
        </Flex>
        <Flex flexDirection="column" gap="1rem" marginY="2rem">
          <Flex flexDirection="column">
            <Text fontSize=".8rem">Email Address</Text>
            <Text> fetchemail@gmail.com </Text>
          </Flex>
          <Flex flexDirection="column">
            <Text fontSize=".8rem" fontWeight="300">
              Username
            </Text>
            <Text>Fetch username</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text fontSize=".8rem" fontWeight="300">
              Account Name
            </Text>
            <Text>Fetch Account Name</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text fontSize=".8rem" fontWeight="300">
              Account Number
            </Text>
            <Text>Fetch Account Number</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text color="#F44336">Delete Account</Text>
            <Text fontSize=".8rem" fontWeight="300">
              Delete your rotation 2 account
            </Text>
          </Flex>
          <Flex flexDirection="column">
            <Text color="#F44336">Restrict account</Text>
            <Text fontSize=".8rem" fontWeight="300">
              Stop transactions in emergency situations
            </Text>
          </Flex>
        </Flex>
        <Box>
          <Button
            variant="link"
            colorScheme="transparent"
            color="#24133F"
            textAlign="left">
            Logout
          </Button>
        </Box>
      </Flex>
    </Page_Backround>
  );
};

export default ProfilePage;
