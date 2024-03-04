import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Page_Backround from "../Major_Components/Page_Background";
import profile from "../assets/profileImage.svg";

const ProfilePage = () => {
  const profileDetails = [
    { label: "Email Address", value: "fetchemail@gmail.com" },
    { label: "Username", value: "Fetch username" },
    { label: "Account Name", value: "Fetch Account Name" },
    { label: "Account Number", value: "Fetch Account Number" },
  ];

  const profileActions = [
    { label: "Delete Account", value: "Delete your rotation 2 account" },
    {
      label: "Restrict account",
      value: "Stop transactions in emergency situations",
    },
  ];

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
          {profileDetails.map((detail) => (
            <Flex key={detail.label} flexDirection="column">
              <Text fontSize=".8rem">{detail.label}</Text>
              <Text>{detail.value}</Text>
            </Flex>
          ))}
          {profileActions.map((action) => (
            <Flex key={action.label} flexDirection="column">
              <Text color="#F44336">{action.label}</Text>
              <Text fontSize=".8rem" fontWeight="300">
                {action.value}
              </Text>
            </Flex>
          ))}
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
