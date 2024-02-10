import {
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthButton from "../Minor_ Components/AuthButton";

const Signup = () => {
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
        Create Accont
      </Heading>
      <Flex flexDirection="column" gap="2rem">
        <Input variant="flushed" placeholder="Email address" required />
        <Input variant="flushed" placeholder="Password" required />
        <Input variant="flushed" placeholder="Confirm Password" required />
        <Input variant="flushed" placeholder="Referal ID" />
      </Flex>

      <RadioGroup
        name="gender"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginY="1rem">
        <Radio value="male">Male</Radio>
        <Radio value="female">Female </Radio>
      </RadioGroup>
      <AuthButton buttonText="Sign Up" />
      <Flex
        gap=".5rem"
        justifyContent="center"
        fontSize=".8rem"
        marginY=".5rem">
        <Text fontWeight="400">Already have an account?</Text>{" "}
        <Link to="/login">Login</Link>
      </Flex>
    </Flex>
  );
};

export default Signup;
