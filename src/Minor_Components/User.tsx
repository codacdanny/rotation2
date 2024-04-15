import { Flex, Image, Text } from "@chakra-ui/react";
import headshot from "../assets/bigProfileImage.svg";
import { useUser } from "../Context/UserContext";

const User = () => {
  return (
    <Flex flexDirection="column" alignItems="center" gap=".7rem">
      <Image src={headshot} alt="headshot" boxSize="150px" />
      <Text>User</Text>
    </Flex>
  );
};

export default User;
