import {
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";

const Signup = () => {
  return (
    <Flex
      backgroundColor="#F7F7F7"
      flexDirection="column"
      paddingY="2rem"
      paddingX="1rem">
      <Heading as="h3" fontSize="1.5rem" textAlign="center" marginBottom="2rem">
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

      <Button
        borderRadius="30px"
        width="fit-content"
        margin="1rem auto"
        padding="1rem 2.5rem"
        backgroundColor="#6B39BD"
        color="#F7F7F7">
        Sign Up
      </Button>
      <Flex gap=".5rem" justifyContent="center" fontSize=".8rem" marginY="1rem">
        <Text fontWeight="400">Already have an account?</Text>{" "}
        <Link fontWeight="100" href="#">
          Login
        </Link>
      </Flex>
    </Flex>
  );
};

export default Signup;
