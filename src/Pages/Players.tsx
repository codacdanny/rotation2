import { Flex, Heading, Text } from "@chakra-ui/react";
import Page_Backround from "../Major_Components/Page_Background";
import PrimaryButton from "../Minor_Components/PrimaryButton";

const Players = () => {
  return (
    <Page_Backround>
      <Flex
        margin="auto 0"
        flexDirection="column"
        alignItems="center"
        color="#24133F"
        gap="3rem">
        <Heading>Number of Players registered under you</Heading>
        <Text fontSize="1.2rem" fontWeight={600}>
          {" "}
          You have a total of{" "}
        </Text>
        <Text fontSize="2rem" fontWeight={800}>
          0 Players
        </Text>
        <Text textAlign="justify">
          Please click on your userId, copy your profile Link and share to
          people to have them in your downline
        </Text>
        <PrimaryButton
          textColor="#F7F7F7"
          backgroundColor="purple"
          buttonText="View Winners"
          pageName="winners"
        />
      </Flex>
    </Page_Backround>
  );
};

export default Players;
