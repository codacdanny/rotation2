import { useEffect, useState } from "react";

import { Flex, Box, Text, Image, Button } from "@chakra-ui/react";
import one from "../assets/1.svg";
import two from "../assets/2.svg";
import three from "../assets/3.svg";
import four from "../assets/4.svg";
import five from "../assets/5.svg";
import seven from "../assets/7.svg";
import eight from "../assets/8.svg";
import ten from "../assets/10.svg";
import eleven from "../assets/11.svg";
import profile from "../assets/profileImage.svg";

const GameRoom: React.FC = () => {
  const [landscapeMode, setLandscapeMode] = useState<boolean>(false);

  useEffect(() => {
    const handleOrientationChange = () => {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      setLandscapeMode(isLandscape);
    };

    handleOrientationChange(); // Check orientation on initial render
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <Flex
      direction={landscapeMode ? "column" : "column"}
      backgroundColor="rgba(107, 57, 189, .65)"
      height="100svh"
      padding="1.5rem 1rem"
      justifyContent="space-between"
      width="100%">
      <Flex alignItems="start" justifyContent="space-evenly">
        <Image src={one} alt="card" />
        <Image src={two} alt="card" />
        <Image src={three} alt="card" />
        <Image src={four} alt="card" />
        <Image src={five} alt="card" />
        <Image src={seven} alt="card" />
        <Image src={eight} alt="card" />
        <Image src={ten} alt="card" />
        <Image src={eleven} alt="card" />
      </Flex>
      <Flex flexDirection="column" gap="1rem">
        <Flex justifyContent="space-between" width="100%">
          <Text
            fontWeight={500}
            fontSize="1.3rem"
            backgroundColor="#CEC0E2"
            padding="1rem"
            borderRadius="50% 50% 50% 50% / 60% 60% 30% 40%">
            50
          </Text>
          <Text
            fontWeight={500}
            fontSize="1.3rem"
            backgroundColor="#CEC0E2"
            padding="1rem"
            borderRadius="50% 50% 50% 50% / 60% 60% 30% 40%">
            120
          </Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex width="40%" gap=".5rem" alignItems="center">
            <Flex flexDirection="column" gap=".2rem">
              <Image src={profile} height="4rem" alt="user Image" />
              <Text>User1234</Text>
            </Flex>
            <Flex overflowX="scroll">
              <Image src={one} alt="card" />
              <Image src={two} alt="card" />
              <Image src={three} alt="card" />
              <Image src={four} alt="card" />
              <Image src={five} alt="card" />
              <Image src={seven} alt="card" />
              <Image src={eight} alt="card" />
            </Flex>
          </Flex>
          <Box width="30%" textAlign="center">
            <Button
              borderRadius="6px"
              width="fit-content"
              margin="1rem auto"
              padding="1rem 2.5rem"
              backgroundColor="#6B39BD"
              color="#F7F7F7"
              onClick={() => {}}
              _hover={{
                backgroundColor: "#6B39BD",
              }}
              _active={{
                transform: "scale(1.05)",
                transition: "all .2s ease-in-out",
              }}>
              Pick
            </Button>
          </Box>

          <Flex width="40%" gap=".5rem" alignItems="center">
            <Flex flexDirection="column" gap=".2rem">
              <Image src={profile} height="4rem" alt="user Image" />
              <Text>User1234</Text>
            </Flex>
            <Flex overflowX="scroll">
              <Image src={one} alt="card" />
              <Image src={two} alt="card" />
              <Image src={three} alt="card" />
              <Image src={four} alt="card" />
              <Image src={five} alt="card" />
              <Image src={seven} alt="card" />
              <Image src={eight} alt="card" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GameRoom;
