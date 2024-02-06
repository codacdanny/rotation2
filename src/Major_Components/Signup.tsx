import { Flex, Heading, Input, Radio } from "@chakra-ui/react";

const Signup = () => {
  return (
    <Flex
      backgroundColor="#F7F7F7"
      flexDirection="column"
      paddingY="2rem"
      paddingX="1rem">
      <Heading as="h3">Create Accont</Heading>
      <Input variant="flushed" placeholder="Email address" required />
      <Input variant="flushed" placeholder="Password" required />
      <Input variant="flushed" placeholder="Confirm Password" required />
      <Input variant="flushed" placeholder="Referal ID" />
      <Radio value="male">Male</Radio>
      <Radio value="female">Female </Radio>
    </Flex>
  );
};

export default Signup;
