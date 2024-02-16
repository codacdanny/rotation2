import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { AiOutlineDown } from "react-icons/ai";
import headshot from "../assets/bigProfileImage.svg";
import PrimaryButton from "../Minor_ Components/PrimaryButton";
import user from "../assets/user.svg";
import setting from "../assets/setting-2.svg";
import favourite from "../assets/star.svg";
import notification from "../assets/notification-bing.svg";

const PickPage = () => {
  return (
    <Box
      paddingY="2rem"
      paddingX="1rem"
      height="100%"
      bgGradient="linear-gradient(180deg, #E1D7F2 0%, rgba(107, 57, 189, 0.20) 53.96%, rgba(225, 215, 242, 0.00) 100%)">
      <Flex
        flexDirection="column"
        color="#24133F"
        alignItems="center"
        gap="2rem">
        <Heading textAlign="center">Welcome to the grand experience</Heading>
        <Text fontSize="1.5rem" color="#24133F">
          Let's Play
        </Text>
        <Image src={headshot} alt="headshot" boxSize="150px" />
        <Text fontSize="2.5rem" color="#24133F">
          Bal: N2000
        </Text>
      </Flex>
      <Box textAlign="center" marginY="2rem">
        <PrimaryButton
          buttonText="Find your opponent"
          backgroundColor="#24133F"
          textColor="#F7F7F7"
        />
      </Box>
      <Box textAlign="center">
        <CircularProgress
          value={1}
          size="180px"
          color="#24133F"
          trackColor="#ded5e8">
          <CircularProgressLabel
            color="#24133F"
            fontSize="2rem"
            fontWeight="500">
            0%
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Flex justifyContent="space-between">
        <Flex flexDirection="column" alignItems="left" gap="1rem">
          <Image src={user} alt="headshot" boxSize="30px" />
          <Image src={setting} alt="headshot" boxSize="30px" />
          <Image src={favourite} alt="headshot" boxSize="30px" />
          <Image src={notification} alt="headshot" boxSize="30px" />
        </Flex>
        <Flex alignItems="end" fontWeight="600" color="#24133F">
          <AiOutlineDown rotate="90" size="40px" />
          Back
        </Flex>
      </Flex>
    </Box>
  );
};

export default PickPage;
