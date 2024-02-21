import { Box, Flex, Image } from "@chakra-ui/react";
import rotation2_logo from "../assets/Rotation2.png";
import { ReactNode } from "react";

type AuthBackgroundProps = {
  children: ReactNode;
};

const Auth_Background: React.FC<AuthBackgroundProps> = ({ children }) => {
  return (
    <Box backgroundColor="blue">
      <Box
        backgroundColor="#E1D7F2"
        maxWidth="100%"
        height="115svh"
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
          height="10rem"
          objectFit="cover"
          margin="0rem auto"
        />
        <Flex gap="8rem" position="relative">
          <Box
            position="absolute"
            left="4%"
            height="385px"
            width="124px"
            backgroundColor="#9C7BD3"
            margin="3rem 0 0 1rem"
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
          marginTop="7rem"
          paddingY="rem"
          top="45%"
          left="50%"
          transform="translate(-50%, -50%)">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Auth_Background;
