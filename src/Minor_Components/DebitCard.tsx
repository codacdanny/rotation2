import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import cardBg from "../assets/cardBg.png";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { useUser } from "../Context/UserContext";
import { useState } from "react";

interface CardInfoProps {
  label: string;
  value: string;
}

const CardInfo: React.FC<CardInfoProps> = ({ label, value }) => (
  <Flex flexDirection="column" gap=".5rem">
    <Text>{label}</Text>
    <Text>{value}</Text>
  </Flex>
);

const DebitCard: React.FC = () => {
  const [view, setView] = useState<boolean>(true);
  const userDetails = useUser();
  const toggleView = () => {
    setView((prevView) => !prevView);
  };

  return (
    <Box>
      {!userDetails && <Text>Loading</Text>}
      {userDetails && (
        <>
          <Box
            marginTop="2rem"
            backgroundImage={cardBg}
            height="100%"
            position="relative"
            padding="1.5rem 2rem"
            color="#F7F7F7">
            <Text fontSize="1.2rem" fontWeight={400}>
              {userDetails.phoneNumber}
            </Text>

            <Flex marginTop="4rem" gap="2rem" alignItems="center">
              <Text fontWeight={600} fontSize="2rem">
                {view ? `RC ${userDetails.rcBalance}` : "******"}
              </Text>
              <IconButton
                onClick={toggleView}
                variant="ghost"
                colorScheme="transparent"
                aria-label="view balance"
                icon={
                  view ? (
                    <AiFillEye size="2rem" color="#F7F7F7" />
                  ) : (
                    <AiFillEyeInvisible size="2rem" color="#F7F7F7" />
                  )
                }
              />
            </Flex>
          </Box>
          <Flex
            backgroundColor="#CEBDE9"
            padding="1rem 1rem 1.5rem 1rem"
            justifyContent="space-around"
            alignItems="center">
            <CardInfo label="Card Number" value="**** **** *767" />
            <CardInfo label="Date" value="12/25" />
            <CardInfo label="CVV" value="878" />
          </Flex>
        </>
      )}
    </Box>
  );
};

export default DebitCard;
