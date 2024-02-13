import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

const Nav = () => {
  return (
    <Box as="nav">
      <HStack>
        <Image />
        <VStack>
          <Text></Text>
          <Text></Text>
        </VStack>
        <Image />
      </HStack>
    </Box>
  );
};

export default Nav;
