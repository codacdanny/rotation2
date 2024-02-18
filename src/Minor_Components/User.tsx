import { Flex, Image, Text } from "@chakra-ui/react";
import headshot from "../assets/bigProfileImage.svg";

const User = () => {
  return (
    <Flex flexDirection="column" alignItems="center" gap=".7rem">
      <Image src={headshot} alt="headshot" boxSize="150px" />
      <Text> User12a4</Text>
    </Flex>
  );
};

export default User;
