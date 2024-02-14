import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import AuthButton from "../Minor_ Components/AuthButton";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Flex
      backgroundColor="#F7F7F7"
      flexDirection="column"
      paddingY="2rem"
      paddingX="1rem">
      <Heading
        as="h3"
        fontSize="1.5rem"
        textAlign="center"
        marginBottom="1.5rem"
        fontWeight="500">
        Welcome Back
      </Heading>
      <Flex flexDirection="column" gap="2rem">
        <Input variant="flushed" placeholder="Email address" required />
        <Input variant="flushed" placeholder="Password" required />
        <Box
          fontSize=".7rem"
          fontWeight={200}
          color="#24133F"
          textAlign="right">
          <Link to="#">forgot password?</Link>
        </Box>
      </Flex>
      <Box textAlign="center">
        <Link to="/dashboard">
          <AuthButton buttonText="Login" />
        </Link>
      </Box>
      <Flex
        gap=".5rem"
        justifyContent="center"
        fontSize=".8rem"
        marginY=".5rem">
        <Text fontWeight="400">Don't have an account?</Text>{" "}
        <Link to="/">Sign up</Link>
      </Flex>
    </Flex>
  );
};

export default Login;
