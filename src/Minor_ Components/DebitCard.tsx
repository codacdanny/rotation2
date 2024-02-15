import { Box, Button, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import cardBg from "../assets/cardBg.svg";
import playButton from "../assets/play.svg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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

  const toggleView = () => {
    setView((prevView) => !prevView);
  };

  return (
    <Box>
      <Box
        marginTop="2rem"
        backgroundImage={cardBg}
        height="100%"
        position="relative"
        padding="1.5rem 2rem"
        color="#F7F7F7">
        <Text fontWeight={300}>Name On the Card</Text>
        <Button
          as="a"
          variant="ghost"
          colorScheme="transparent"
          position="absolute"
          right="0%"
          top="30%">
          <Image src={playButton} alt="play button" />
        </Button>

        <Flex marginTop="4rem" gap="2rem" alignItems="center">
          <Text fontWeight={600} fontSize="2rem">
            {view ? "N 2000" : "******"}
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
    </Box>
  );
};

export default DebitCard;
