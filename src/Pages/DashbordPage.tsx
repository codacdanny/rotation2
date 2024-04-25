import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import Nav from "../Minor_Components/Nav";
import DebitCard from "../Minor_Components/DebitCard";
import PrimaryButton from "../Minor_Components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

import UserTransactions from "../Major_Components/UserTransaction";
import { useUser } from "../Context/UserContext";
import axios from "axios";
import { useState } from "react";

// import { useEffect, useState } from "react";
// import { useSocket } from "../services/Context/SocketContext";

type DashBoardPageProps = {
  socket: Socket;
};

const DashbordPage: React.FC<DashBoardPageProps> = ({ socket }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const toast = useToast();
  const { userDetails } = useUser();
  const handleJoinWaitList = async () => {
    const token = localStorage.getItem("token");
    const balance = userDetails?.rcBalance;
    if (token && balance >= 200) {
      let timeRemainingInMins: number;
      let timeRemainingInHours: number;
      try {
        setLoading(true);
        const joinWaitRoomResponse = await axios.get<any>(
          "https://rotation2-backend.onrender.com/api/user/join-wait-list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        timeRemainingInHours =
          joinWaitRoomResponse.data.data.timeRemaining.hours;
        timeRemainingInMins =
          joinWaitRoomResponse.data.data.timeRemaining.minutes;

        if (joinWaitRoomResponse.data.msg === "Added to waitlist already.") {
          toast({
            title: "Warning",
            description: "You are already in the waitlist",
            status: "warning",
            position: "top-right",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Success",
            description: "You have been added to the waitlist",
            status: "success",
            position: "top-right",
            duration: 9000,
            isClosable: true,
          });
        }
        console.log(joinWaitRoomResponse.data.data.timeRemaining);

        navigate(
          `/pair/?minutes=${timeRemainingInMins}&hour=${timeRemainingInHours}`
        );
      } catch (error) {
        setLoading(false);
        if (error.response?.data.msg === "Insufficient RC balance.") {
          toast({
            title: "Error",
            description: "Insufficient RC balance",
            status: "error",
            position: "top-right",
            duration: 9000,
            isClosable: true,
          });
        }

        if (error.response?.data.msg === "Not assigned to a room.") {
          toast({
            title: "Warning",
            description: "Please Try Again",
            status: "warning",
            position: "top-right",
            duration: 9000,
            isClosable: true,
          });
        }
      }
    } else {
      toast({
        title: "Error",
        description: "An Error Ocurred, try again",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Box backgroundColor="#F7F7F7" minHeight="100svh" padding=".7rem">
      <Nav />
      <DebitCard />
      <Box textAlign="center" marginY="1rem" width="100%">
        <Button
          colorScheme="transparent"
          isLoading={loading}
          color="#fff"
          bgColor="#24133F"
          width="100%"
          className="pulse circle orange"
          onClick={handleJoinWaitList}>
          Join Waiting Room{" "}
        </Button>
      </Box>

      <Flex marginY="2rem" paddingX="2rem" justifyContent="space-evenly">
        <PrimaryButton
          textColor="#F7F7F7"
          backgroundColor="#24133F"
          buttonText="Withdraw"
          pageName="dashboard"
        />

        <PrimaryButton
          textColor="#24133F"
          backgroundColor="#F3F7F"
          buttonText="Top Up"
          pageName="dashboard"
        />
      </Flex>
      <Box textAlign="center" marginY="1rem" width="100%">
        <PrimaryButton
          textColor="#F7F7F7"
          backgroundColor="#24133F"
          buttonText="View Players"
          pageName="players"
        />
      </Box>

      <UserTransactions />
    </Box>
  );
};

export default DashbordPage;
