import { Box, Flex, Image } from "@chakra-ui/react";
import rotation2_logo from "../assets/Rotation2.svg";
import Signup from "./Signup";

const Auth_Background = () => {
  return (
    <Box backgroundColor="grey" height="fit-content">
      <Box
        backgroundColor="#E1D7F2"
        maxWidth="100svw"
        height="fit-content"
        margin="0 auto"
        paddingY="4rem"
        position="relative"
        overflow="hidden">
        <Box
          backgroundColor="#9C7BD3"
          height="100px"
          width="100px"
          borderRadius="50%"
          position="absolute"
          right="-7%"
          top="-3%"
        />
        <Image
          src={rotation2_logo}
          boxSize="fit-content"
          objectFit="cover"
          margin="3rem auto"
        />
        <Flex gap="4rem">
          <Box
            height="385px"
            width="124px"
            backgroundColor="#9C7BD3"
            margin="3rem 0 0 3rem"
          />
          <Box
            height="385px"
            width="124px"
            backgroundColor="#CEBDE9"
            margin="10rem 0 0 0rem"
          />
        </Flex>
        <Box
          backgroundColor="#CEBDE9"
          height="100px"
          width="100px"
          borderRadius="50%"
          position="absolute"
          left="-10%"
          bottom="-5%"
        />
        <Box
          width="80%"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)">
          <Signup />
        </Box>
      </Box>
    </Box>
  );
};

export default Auth_Background;
