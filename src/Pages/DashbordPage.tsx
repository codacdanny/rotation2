import { Box, Button, Flex } from "@chakra-ui/react";
import Nav from "../Minor_Components/Nav";
import DebitCard from "../Minor_Components/DebitCard";
import PrimaryButton from "../Minor_Components/PrimaryButton";
import Transactiions from "../Major_Components/Transactiions";
import { useNavigate } from "react-router-dom";

// import { useEffect, useState } from "react";
// import { useSocket } from "../services/Context/SocketContext";

const DashbordPage = ({ socket }) => {
  const navigate = useNavigate();

  const handleJoinGame = () => {
    if (socket) console.log("huraayyy");

    // Connect to server
    socket.emit("play", () => {
      console.log("playedd");
    }); // Emit 'play' event to join game
    navigate("/game"); // Pass socket instance as state to game room
  };
  return (
    <Box backgroundColor="#F7F7F7" height="100%" padding=".7rem">
      <Nav />
      <DebitCard />
      <Box textAlign="center" marginY="1rem" width="100%">
        <Button
          color="#fff"
          bgColor="#24133F"
          width="100%"
          className="pulse circle orange"
          colorScheme="violet"
          onClick={handleJoinGame}>
          PLAY GAME
        </Button>
      </Box>

      <Flex marginY="2rem" paddingX="2rem" justifyContent="space-evenly">
        <PrimaryButton
          textColor="#F7F7F7"
          backgroundColor="#24133F"
          buttonText="Withdraw"
          pageName="#"
        />

        <PrimaryButton
          textColor="#24133F"
          backgroundColor="#F3F7F"
          buttonText="Top Up"
          pageName="#"
        />

        <PrimaryButton
          textColor="#F7F7F7"
          backgroundColor="#24133F"
          buttonText="50"
          pageName="#"
        />
      </Flex>
      <Transactiions />
    </Box>
  );
};

export default DashbordPage;
