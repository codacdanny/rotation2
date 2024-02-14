import { Box, Flex } from "@chakra-ui/react";
import Nav from "../Minor_ Components/Nav";
import DebitCard from "../Minor_ Components/DebitCard";
import PrimaryButton from "../Minor_ Components/PrimaryButton";

const DashbordPage = () => {
  return (
    <Box backgroundColor="#F7F7F7" height="100%">
      <Nav />
      <DebitCard />
      <Flex marginY="2rem" paddingX="2rem" justifyContent="space-evenly">
        <PrimaryButton
          textColor="#F7F7F7"
          backgroundColor="#24133F"
          buttonText="Withdraw"
        />
        <PrimaryButton
          textColor="#24133F"
          backgroundColor="#F3F7F"
          buttonText="Top Up"
        />
        <PrimaryButton
          textColor="#F7F7F7"
          backgroundColor="#24133F"
          buttonText="50"
        />
      </Flex>
    </Box>
  );
};

export default DashbordPage;
