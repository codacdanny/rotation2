import { Box, Flex } from "@chakra-ui/react";
import Nav from "../Minor_Components/Nav";
import DebitCard from "../Minor_Components/DebitCard";
import PrimaryButton from "../Minor_Components/PrimaryButton";
import Transactiions from "../Major_Components/Transactiions";

const DashbordPage = () => {
  return (
    <Box backgroundColor="#F7F7F7" height="100%" padding=".7rem">
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
      <Transactiions />
    </Box>
  );
};

export default DashbordPage;
