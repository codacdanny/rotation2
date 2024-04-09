import { Box, Flex, Image } from "@chakra-ui/react";
import rotation2_logo from "../assets/Rotation2.png";
import { ReactNode } from "react";

type AuthBackgroundProps = {
  children: ReactNode;
};

const Auth_Background: React.FC<AuthBackgroundProps> = ({ children }) => {
  return (
    <Box>
      <Box
        backgroundColor="#E1D7F2"
        maxWidth="100%"
        minHeight="150svh"
        margin="0 auto"
        paddingY="2rem"
        position="relative"
        overflow="hidden">
        <Image
          src={rotation2_logo}
          boxSize="fit-content"
          height="10rem"
          objectFit="cover"
          margin="0rem auto"
        />
        <Box
          backgroundColor="#9C7BD3"
          height="100px"
          width="100px"
          borderRadius="50%"
          position="absolute"
          right="-7%"
          top="-3%"
        />
        <Flex gap="8rem" position="relative">
          <Box
            position="absolute"
            left="4%"
            height="385px"
            width="124px"
            backgroundColor="#9C7BD3"
            margin="-1rem 0 0 1rem"
          />
          <Box
            position="absolute"
            right="4%"
            height="385px"
            width="124px"
            backgroundColor="#CEBDE9"
            margin="10rem 0rem 0 0rem"
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
          marginY="3rem"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Auth_Background;
