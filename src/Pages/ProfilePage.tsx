import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
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
          gap="1rem">
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
        <Flex flexDirection="column">
          <Flex
            flexDirection="column"
            backgroundColor="#CEBDE9"
            padding=".5rem 1rem"
            borderRadius="6px">
            <Text>Email Address</Text>
            <Text> fetchemail@gmail.com </Text>
          </Flex>
          <Flex flexDirection="column">
            <Text>Username</Text>
            <Text>Fetch username</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text>Account Name</Text>
            <Text>Fetch Account Name</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text>Account Number</Text>
            <Text>Fetch Account Number</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text>Delete Account</Text>
            <Text>Delete your rotation 2 account</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text>Restrict account</Text>
            <Text>Stop transactions in emergency situations</Text>
          </Flex>
        </Flex>
        <Button>Logout</Button>
      </Flex>
    </Page_Backround>
  );
};

export default ProfilePage;
