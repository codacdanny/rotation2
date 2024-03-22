import { Box, Flex } from "@chakra-ui/react";
import Nav from "../Minor_Components/Nav";
import DebitCard from "../Minor_Components/DebitCard";
import PrimaryButton from "../Minor_Components/PrimaryButton";
import Transactiions from "../Major_Components/Transactiions";
import { Link } from "react-router-dom";

const DashbordPage = () => {
  return (
    <Box backgroundColor="#F7F7F7" height="100%" padding=".7rem">
      <Nav />
      <DebitCard />
      <Flex marginY="2rem" paddingX="2rem" justifyContent="space-evenly">
        <Link to="/admin">
          <PrimaryButton
            textColor="#F7F7F7"
            backgroundColor="#24133F"
            buttonText="Withdraw"
          />
        </Link>
        <Link to="/game">
          <PrimaryButton
            textColor="#24133F"
            backgroundColor="#F3F7F"
            buttonText="Top Up"
          />
        </Link>
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
