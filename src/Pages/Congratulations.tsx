import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Page_Backround from "../Major_Components/Page_Background";
import profile from "../assets/profileImage.svg";
import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useUser } from "../Context/UserContext";

const Congratulations = ({ socket }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const winner = queryParams.get("winner");
  const level = queryParams.get("level");
  const points = queryParams.get("points");
  console.log(level, winner);
  // const {userDetails} = useUser()
  const handleNextLevel = async () => {
    if (socket) {
      try {
        await socket.emit("newPair", winner, level); // Wait for "newPair" to complete
        await socket.emit("winner", winner, level); // Wait for "winner" to complete
        navigate("/game");
      } catch (error) {
        console.error("Error emitting socket events:", error);
        // Handle errors appropriately (e.g., display an error message)
      }
    } else {
      // Handle the case where socket is not available
      return; // Or take other actions
    }
  };
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
            CONGRATULATIONS!!
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
          {points} points Next Level Unlocked
        </Box>
        <Flex justifyContent="space-between">
          <Button
            colorScheme="transparent"
            color="#24133F"
            onClick={() => navigate("/dashboard")}>
            Go to DashbordPage
          </Button>
          <Button colorScheme="purple" onClick={handleNextLevel}>
            Start Next Level
          </Button>
        </Flex>
      </Box>
    </Page_Backround>
  );
};

export default Congratulations;
