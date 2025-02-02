import React, { useState, ChangeEvent, FormEventHandler } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

type FormData = {
  phoneNumber: string;
  password: string;
};

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: "",
    password: "",
  });
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const toast = useToast();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://rotation2-backend.onrender.com/api/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.data.token);
      navigate("/dashboard");
    } catch (error: any) {
      setLoading(false);
      console.error((error as AxiosError).response?.data);
      toast({
        title: "Error",
        description: error.response?.data.msg || "connection error",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    }
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
            type="number"
            variant="flushed"
            placeholder="phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          <InputGroup>
            <Input
              variant="flushed"
              placeholder="Password"
              name="password"
              type={show ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <InputRightElement onClick={handleClick}>
              {show ? (
                <AiFillEye opacity={0.4} />
              ) : (
                <AiFillEyeInvisible opacity={0.4} />
              )}
            </InputRightElement>
          </InputGroup>
          <Box
            fontSize=".7rem"
            fontWeight={200}
            color="#24133F"
            textAlign="right">
            <Link to="#">forgot password?</Link>
          </Box>
        </Flex>
        <Box textAlign="center">
          <Button
            isLoading={loading}
            type="submit"
            borderRadius="30px"
            width="fit-content"
            margin="1rem auto"
            padding="1rem 2.5rem"
            backgroundColor="#6B39BD"
            color="#F7F7F7"
            _hover={{
              backgroundColor: "#6B39BD",
            }}
            _active={{
              transform: "scale(1.05)",
              transition: "all .2s ease-in-out",
            }}>
            Login
          </Button>
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
