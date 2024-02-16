import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import headshot from "../assets/bigProfileImage.svg";
import PrimaryButton from "../Minor_ Components/PrimaryButton";
const PickPage = () => {
  return (
    <Box
      height="100svh"
      bgGradient="linear-gradient(180deg, #E1D7F2 0%, rgba(107, 57, 189, 0.20) 53.96%, rgba(225, 215, 242, 0.00) 100%)">
      <Flex flexDirection="column" color="#24133F" alignItems="center">
        <Heading textAlign="center">Welcome to the grand experience</Heading>
        <Text>Let's Play</Text>
        <Image src={headshot} alt="headshot" boxSize="150px" />
        <Text>Bal: N2000</Text>
      </Flex>
      <Box textAlign="center">
        <PrimaryButton
          buttonText="Find your opponent"
          backgroundColor="#24133F"
          textColor="#F7F7F7"
        />
      </Box>
      <Box textAlign="center">
        <CircularProgress value={0} size="180px">
          <CircularProgressLabel
            color="#24133F"
            fontSize="2rem"
            fontWeight="500">
            0%
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
    </Box>
  );
};

export default PickPage;
