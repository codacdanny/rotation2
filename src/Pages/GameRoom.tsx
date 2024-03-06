import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import one from "../assets/1.svg";
import two from "../assets/2.svg";
import three from "../assets/3.svg";
import four from "../assets/4.svg";
import five from "../assets/40.svg";
import six from "../assets/7.svg";
import seven from "../assets/8.svg";
import eight from "../assets/9.svg";
import nine from "../assets/170.svg";
import ten from "../assets/11.svg";
import profile from "../assets/profileImage.svg";

type Card = {
  image: string;
  value: number;
};

const cardImages: Card[] = [
  { image: one, value: 10 },
  { image: two, value: 2 },
  { image: three, value: 3 },
  { image: four, value: 140 },
  { image: five, value: 40 },
  { image: six, value: 70 },
  { image: seven, value: 80 },
  { image: eight, value: 50 },
  { image: nine, value: 170 },
  { image: ten, value: 160 },
];

type UserCards = Card[];
type Sum = number;

const MAX_CARDS = 10; // Maximum number of cards each user can pick

const GameRoom: React.FC = () => {
  const [landscapeMode, setLandscapeMode] = useState<boolean>(false);
  const [user1Cards, setUser1Cards] = useState<UserCards>([]);
  const [user2Cards, setUser2Cards] = useState<UserCards>([]);
  const [user1Sum, setUser1Sum] = useState<Sum>(0);
  const [user2Sum, setUser2Sum] = useState<Sum>(0);
  const [currentUser, setCurrentUser] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleOrientationChange = () => {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      setLandscapeMode(isLandscape);
    };

    handleOrientationChange();
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    if (user1Cards.length === MAX_CARDS || user2Cards.length === MAX_CARDS) {
      onOpen();
    }
  }, [user1Cards, user2Cards, onOpen]);

  const handlePickCard = () => {
    if (currentUser === 1 && user1Cards.length >= MAX_CARDS) {
      alert("User 1 has reached the maximum number of cards!");
      return;
    }

    if (currentUser === 2 && user2Cards.length >= MAX_CARDS) {
      alert("User 2 has reached the maximum number of cards!");
      return;
    }

    const randomCardIndex = Math.floor(Math.random() * cardImages.length);
    const pickedCard = cardImages[randomCardIndex];

    if (currentUser === 1) {
      setUser1Cards([...user1Cards, pickedCard]);
      setUser1Sum(user1Sum + pickedCard.value);
      setCurrentUser(2);
    } else {
      setUser2Cards([...user2Cards, pickedCard]);
      setUser2Sum(user2Sum + pickedCard.value);
      setCurrentUser(1);
    }
  };

  return (
    <>
      <Flex
        direction={landscapeMode ? "column" : "column"}
        backgroundColor="rgba(107, 57, 189, .65)"
        height="100svh"
        padding="1.5rem 1rem"
        justifyContent="space-between"
        width="100%">
        <Flex alignItems="start" justifyContent="space-evenly" wrap="wrap">
          {cardImages.map((card, index) => (
            <Image
              key={index}
              height="6rem"
              src={card.image}
              alt={`Card ${index + 1}`}
            />
          ))}
        </Flex>

        <Flex flexDirection="column" gap="1rem">
          <Flex justifyContent="space-between" width="100%">
            <TextSumBox sum={user1Sum} />
            <TextSumBox sum={user2Sum} />
          </Flex>

          <Flex justifyContent="space-between" alignItems="center">
            <UserBox profile={profile} cards={user1Cards} name="User1" />
            <Button
              onClick={handlePickCard}
              borderRadius="6px"
              width="fit-content"
              margin="1rem auto"
              padding="1rem 2.5rem"
              backgroundColor="#6B39BD"
              color="#F7F7F7"
              _hover={{ backgroundColor: "#6B39BD" }}
              _active={{
                transform: "scale(1.05)",
                transition: "all .2s ease-in-out",
              }}>
              Pick
            </Button>
            <UserBox profile={profile} cards={user2Cards} name="User2" />
          </Flex>
        </Flex>
      </Flex>
      <WinnerModal
        isOpen={isOpen}
        onClose={onClose}
        user1Sum={user1Sum}
        user2Sum={user2Sum}
      />
    </>
  );
};

const TextSumBox: React.FC<{ sum: Sum }> = ({ sum }) => (
  <Text
    fontWeight={500}
    fontSize="1.3rem"
    backgroundColor="#CEC0E2"
    padding=".5rem"
    borderRadius="50% 50% 50% 50% / 60% 60% 30% 40%">
    {sum}
  </Text>
);

const UserBox: React.FC<{
  profile: string;
  cards: UserCards;
  name: string;
}> = ({ profile, cards, name }) => (
  <Flex width="40%" gap=".5rem" alignItems="center">
    <Flex flexDirection="column" gap=".2rem">
      <Image src={profile} height="4rem" alt={`${name}'s Image`} />
      <Text>{name}</Text>
    </Flex>
    <Flex overflowX="scroll" gap=".2rem">
      {cards.map((card, index) => (
        <Image
          key={index}
          src={card.image}
          alt={`Card ${index + 1}`}
          height="6rem"
        />
      ))}
    </Flex>
  </Flex>
);

const WinnerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  user1Sum: Sum;
  user2Sum: Sum;
}> = ({ isOpen, onClose, user1Sum, user2Sum }) => {
  let winner;
  if (user1Sum > user2Sum) {
    winner = "User1";
  } else if (user1Sum < user2Sum) {
    winner = "User2";
  } else {
    winner = "It's a tie!";
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>THE END!!!</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex flexDirection="column" gap=".5rem">
            <Text> THE WINNER IS {winner} </Text>
            <Text>{winner === "User1" ? user1Sum : user2Sum}</Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameRoom;
