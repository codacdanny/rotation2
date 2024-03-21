import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import AuthButton from "../Minor_Components/AuthButton";
import { Link } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send formData to the backend
    console.log(formData);
    // You can make a fetch request or use any library like Axios to send data to the backend here
  };

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
      <form onSubmit={handleSubmit}>
        <Flex flexDirection="column" gap="2rem">
          <Input
            variant="flushed"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Input
            variant="flushed"
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Box
            fontSize=".7rem"
            fontWeight={200}
            color="#24133F"
            textAlign="right">
            <Link to="#">forgot password?</Link>
          </Box>
        </Flex>
        <Box textAlign="center">
          <AuthButton buttonText="Login" />
        </Box>
      </form>
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
