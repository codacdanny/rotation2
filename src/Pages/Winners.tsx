import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Page_Backround from "../Major_Components/Page_Background";
import Nav from "../Minor_Components/Nav";

interface Winner {
  username: string;
  amount: string;
}

const Winners = () => {
  const winnersData: Winner[] = [
    { username: "User123", amount: "RC200" },
    { username: "User124", amount: "RC400" },
    { username: "User125", amount: "RC200" },
    { username: "User126", amount: "RC600" },
    { username: "User127", amount: "RC200" },
    { username: "User128", amount: "RC800" },
    { username: "User129", amount: "RC2000" },
  ]; // Replace with actual winner data

  return (
    <Page_Backround>
      {winnersData && (
        <Box>
          <Flex color="#24133F" flexDirection="column" gap="2rem">
            <Heading textAlign="center"> Winners</Heading>
            <Text>
              These are people who registered with your referaal link and won
              games.
            </Text>
            <Nav />
            <Text>As an agent you get a certain percentage of their wins</Text>
          </Flex>
          {winnersData.map((winner) => (
            <Flex
              fontWeight="500"
              my="2rem"
              key={winner.username}
              justifyContent="space-between">
              <Text>{winner.username}</Text>
              <Text color="#805ad5">{winner.amount}</Text>
            </Flex>
          ))}
          <Text textAlign="center">
            Congratulations On your Win. your percentage will be added to your
            wallet
          </Text>
        </Box>
      )}
      {!winnersData && (
        <Heading textAlign="center" my="3rem">
          {" "}
          No winers Yet
        </Heading>
      )}
    </Page_Backround>
  );
};

export default Winners;
