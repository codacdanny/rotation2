import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Page_Backround from "../Major_Components/Page_Background";
import profile from "../assets/profileImage.svg";

const Congratulations = () => {
  return (
    <Page_Backround>
      <Box
        height="100%"
        p="1rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="3rem">
        <Box>
          <Heading my="2rem" color="#24133F">
            CONGRATULAIONS!!
          </Heading>
          <Text color="#24133F" textAlign="center">
            Well played Champ. Let's do more.
          </Text>
        </Box>
        <Box>
          <Image
            src={profile}
            height="4rem"
            alt="Winner Image"
            outline="7px solid #6B39BD"
            borderRadius="50%"
          />
        </Box>
        <Box
          my="4rem"
          borderRadius="6px"
          width="fit-content"
          color="#fff"
          bgGradient="linear-gradient(to right, #6B39BD, #24133F, #5D32A5)"
          padding="1rem">
          254pts LV 2 Unlocked
        </Box>
        <Flex justifyContent="space-between">
          <Button colorScheme="transparent" color="#24133F">
            Go to DashbordPage
          </Button>
          <Button colorScheme="purple">Start Next Level</Button>
        </Flex>
      </Box>
    </Page_Backround>
  );
};

export default Congratulations;
