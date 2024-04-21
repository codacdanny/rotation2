import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Page_Backround from "../Major_Components/Page_Background";
import profile from "../assets/profileImage.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import { useEffect } from "react";
// import { useUser } from "../Context/UserContext";

const Congratulations = ({ socket }) => {
  const [disablePair, setDisablePair] = useState<boolean>(false);
  const [enableNext, setEnableNext] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const winner = queryParams.get("winner");
  const level = queryParams.get("level");
  const points = queryParams.get("points");
  const token = localStorage.getItem("token");
  console.log(level, winner);
  // const {userDetails} = useUser()

  const handleCashOut = async () => {
    try {
      await axios.post(
        "https://rotation2-backend.onrender.com/api/user/cashout",
        1000,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const handleNextLevel = () => {
    if (socket) {
      socket.emit("winner", winner, level);
      navigate("/game");
    }
  };
  const handlePair = () => {
    if (socket) {
      socket.emit("pair", winner, level);
    }
    setDisablePair(!disablePair);
    setEnableNext(!enableNext);
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
        <Box textAlign="center">
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
        <Flex justifyContent="space-between" gap="1rem">
          <Button
            isDisabled={disablePair}
            colorScheme="purple"
            color="#24133F"
            onClick={handlePair}>
            Get Paired
          </Button>
          <Button
            isDisabled={enableNext}
            colorScheme="purple"
            onClick={handleNextLevel}>
            Start Next Level
          </Button>
        </Flex>
        <></>
        <Button
          onClick={handleCashOut}
          marginY="3rem"
          padding="2rem 4rem"
          color="white"
          fontWeight={600}
          fontSize="1.2rem"
          colorScheme="purple"
          className="pulse circle orange"
          bgGradient="linear-gradient(to right, #6B39BD, #24133F, #5D32A5)">
          Cashout {"400 RC"}
        </Button>
      </Box>
    </Page_Backround>
  );
};

export default Congratulations;
