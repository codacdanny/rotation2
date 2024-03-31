import { useState, useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import Nav from "../Minor_Components/Nav";
import DebitCard from "../Minor_Components/DebitCard";
import PrimaryButton from "../Minor_Components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import axios from "axios";
import UserTransactions from "../Major_Components/UserTransaction";

// import { useEffect, useState } from "react";
// import { useSocket } from "../services/Context/SocketContext";

type DashBoardPageProps = {
  socket: Socket;
};

const DashbordPage: React.FC<DashBoardPageProps> = ({ socket }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // const token = localStorage.getItem('token');

    // Include the token in the request headers
    axios
      .get("https://rotation2-backend.onrender.com/api/user/my-details")
      .then((response) => {
        setUserDetails(response.data.data);
        console.log(userDetails);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [userDetails]);

  const handleJoinGame = () => {
    if (socket) console.log("huraayyy");

    socket.emit("play", () => {
      console.log("playedd");
    });
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
      <UserTransactions />
    </Box>
  );
};

export default DashbordPage;
