import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthButton from "../Minor_Components/AuthButton";

const Signup = () => {
  return (
    <Flex
      backgroundColor="#F7F7F7"
      flexDirection="column"
      paddingY="2rem"
      paddingX="1rem"
      marginTop="5rem">
      <Heading
        as="h3"
        fontSize="1.5rem"
        textAlign="center"
        marginBottom="2.5rem"
        fontWeight="500">
        Create Accont
      </Heading>
      <Flex flexDirection="column" gap="2rem">
        <Input variant="flushed" placeholder="Email address" required />
        <InputGroup variant="flushed" gap=".5rem">
          <InputLeftAddon>+234</InputLeftAddon>
          <Input type="tel" placeholder="8156438250" />
        </InputGroup>
        <Input type="number" variant="flushed" placeholder="Age" required />
        <Select placeholder="State">
          <option value="option1">{"states"}</option>
        </Select>
        <Input
          type="password"
          variant="flushed"
          placeholder="Password"
          required
        />
        <Input
          type="password"
          variant="flushed"
          placeholder="Confirm Password"
          required
        />
        <Input variant="flushed" placeholder="Referal ID" required />
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
