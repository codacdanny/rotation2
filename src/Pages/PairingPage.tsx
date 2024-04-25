import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import user from "../assets/user.svg";
import setting from "../assets/setting-2.svg";
import favourite from "../assets/star.svg";
import notification from "../assets/notification-bing.svg";
import User from "../Minor_Components/User";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";

const WelcomeSection: React.FC = () => (
  <Flex flexDirection="column" alignItems="center">
    <Heading textAlign="center">
      Please be patient while we pick an opponent for you
    </Heading>
  </Flex>
);

const CircularProgressSection: React.FC = () => (
  <CircularProgress
    value={75}
    size="180px"
    color="#24133F"
    trackColor="#ded5e8">
    <CircularProgressLabel color="#24133F" fontSize="2rem" fontWeight="500">
      75%
    </CircularProgressLabel>
  </CircularProgress>
);
const FlexSection: React.FC = () => (
  <Flex justifyContent="space-between">
    <Flex
      flexDirection="column"
      alignItems="left"
      gap="1rem"
      marginLeft="-1rem">
      <IconButtonSection icon={user} alt="headshot" />
      <IconButtonSection icon={setting} alt="headshot" />
      <IconButtonSection icon={favourite} alt="headshot" />
      <IconButtonSection icon={notification} alt="headshot" />
    </Flex>
    <Flex alignItems="end" fontWeight="600" color="#24133F">
      <AiOutlineLeft size="20px" />
      <Text>Back</Text>
    </Flex>
  </Flex>
);

const IconButtonSection: React.FC<{ icon: string; alt: string }> = ({
  icon,
  alt,
}) => (
  <Button variant="ghost" colorScheme="transparent">
    <Image src={icon} alt={alt} boxSize="30px" />
  </Button>
);

const PairingPage = ({ socket }) => {
  const [minutesTimer, setMinutesTimer] = useState<number>();
  const [hourTimer, setHourTimer] = useState<number>();
  const { userDetails } = useUser();
  const navigate = useNavigate();
  const balance = userDetails.rcBalance;
  const toast = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const minutes = parseInt(queryParams.get("minutes"));
  const hour = parseInt(queryParams.get("hour"));
  const token = localStorage.getItem("token");
  let minutesTimeRemaining = minutes;
  let hourTimeRemaining = hour;

  const updateTime = async () => {
    try {
      const joinWaitRoomResponse = await axios.get<any>(
        "https://rotation2-backend.onrender.com/api/user/join-wait-list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      minutesTimeRemaining =
        joinWaitRoomResponse.data.data.timeRemaining.minutes;
      setMinutesTimer(minutesTimeRemaining);
      hourTimeRemaining = joinWaitRoomResponse.data.data.timeRemaining.hours;
      setHourTimer(hourTimeRemaining);
    } catch (error) {
      console.error("Error fetching time:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(updateTime, 10000); // Update time every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);
  const handlePlay = () => {
    if (balance) {
      if (socket && balance >= 200) {
        socket.emit("play1", userDetails);

        navigate("/game");
      } else {
        toast({
          title: "Error",
          description: "Insufficient RC balance",
          status: "error",
          position: "top-right",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };
  return (
    <>
      {balance && (
        <>
          {hourTimer ? (
            <Box
              paddingY="2rem"
              paddingX="1rem"
              minHeight="100svh"
              bgGradient="linear-gradient(180deg, #E1D7F2 0%, rgba(107, 57, 189, 0.20) 53.96%, rgba(225, 215, 242, 0.00) 100%)">
              <WelcomeSection />
              <Flex justifyContent="center" marginY="2rem">
                <CircularProgressSection />
              </Flex>
              <Flex gap=".5rem" alignItems="center" justifyContent="center">
                <User />
                <BsArrowRight size="30px" />
                <User />
              </Flex>
              <VStack gap="2rem" marginY="2rem">
                <Text>
                  Please Wait patiently and be here atleast 3 minutes before the
                  game...
                </Text>

                {hourTimer > 0 && minutesTimer >= 0 && minutesTimer < 50 ? (
                  <Box textAlign="center" marginY="1rem" width="fit-content">
                    <Button
                      color="#fff"
                      bgColor="#24133F"
                      width="100%"
                      className="pulse circle orange"
                      colorScheme="violet"
                      onClick={handlePlay}>
                      Play Game
                    </Button>
                  </Box>
                ) : (
                  <></>
                )}

                {hourTimer >= 22 ? (
                  <Text textAlign="center" fontWeight="500">
                    You Missed The Game , Join Next Time
                  </Text>
                ) : (
                  <Text textAlign="center" fontWeight="500">
                    Your game starts in{" "}
                    <span
                      style={{
                        color: "#06BCC1",
                      }}>
                      {hourTimer} hours : {minutesTimer} minutes
                    </span>{" "}
                  </Text>
                )}

                <Text textAlign="center" fontWeight="600" fontSize=".8rem">
                  The Play button appears 20 seconds before the game. so you can
                  click and join a room <br />
                  Also put your device in Landscape mode to get a good feel of
                  the game room
                </Text>
                <Text textAlign="center" fontWeight="300" fontSize=".8rem">
                  Do kindly note that any player who fails to start the game at
                  the end of the timer loses the game.
                </Text>
              </VStack>
              <FlexSection />
            </Box>
          ) : (
            <Box
              paddingY="2rem"
              paddingX="1rem"
              minHeight="100svh"
              bgGradient="linear-gradient(180deg, #E1D7F2 0%, rgba(107, 57, 189, 0.20) 53.96%, rgba(225, 215, 242, 0.00) 100%)">
              <WelcomeSection />
              <Flex justifyContent="center" marginY="2rem">
                <CircularProgressSection />
              </Flex>
              <Flex gap=".5rem" alignItems="center" justifyContent="center">
                <User />
                <BsArrowRight size="30px" />
                <User />
              </Flex>
              <VStack gap="2rem" marginY="2rem">
                <Text>
                  Please Wait patiently and be here atleast 3 minutes before the
                  game...
                </Text>

                {hourTimeRemaining === 0 &&
                minutesTimeRemaining >= 0 &&
                minutesTimeRemaining < 2 ? (
                  <Box textAlign="center" marginY="1rem" width="fit-content">
                    <Button
                      color="#fff"
                      bgColor="#24133F"
                      width="100%"
                      className="pulse circle orange"
                      colorScheme="violet"
                      onClick={handlePlay}>
                      Play Game
                    </Button>
                  </Box>
                ) : (
                  <></>
                )}

                {hourTimeRemaining >= 22 ? (
                  <Text textAlign="center" fontWeight="500">
                    You Missed The Game , Join Next Time
                  </Text>
                ) : (
                  <Text textAlign="center" fontWeight="500">
                    Your game starts in{" "}
                    <span
                      style={{
                        color: "#06BCC1",
                      }}>
                      {hourTimeRemaining} hours : {minutesTimeRemaining} minutes
                    </span>{" "}
                  </Text>
                )}

                <Text textAlign="center" fontWeight="600" fontSize=".8rem">
                  The Play button appears 20 seconds before the game. so you can
                  click and join a room <br />
                  Also put your device in Landscape mode to get a good feel of
                  the game room
                </Text>
                <Text textAlign="center" fontWeight="300" fontSize=".8rem">
                  Do kindly note that any player who fails to start the game at
                  the end of the timer loses the game.
                </Text>
              </VStack>
              <FlexSection />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default PairingPage;
