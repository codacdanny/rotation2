/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

import Countdown from "react-countdown";
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
import back from "../assets/back.svg";

type GameRoomProps = {
  socket: Socket;
};
type Card = {
  image: string;
  value: number;
};

type GameState = {
  turn: number;
  player1: {
    id: string;
    userId: string;
    phoneNumber: number;
    cardPickedList: number[];
    cardPickedSum: number;
    noOfPlay: number;
  };
  player2?: {
    // Make player2 optional since it's initialized later
    id: string;
    userId: string;
    phoneNumber: number;
    cardPickedList: number[];
    cardPickedSum: number;
    noOfPlay: number;
  };
} | null;
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

const shuffleArray = (array: Card[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars

type UserCards = Card[] | string | undefined;
type Sum = number | string | undefined;

const TURN_DURATION = 15000; // 5 seconds

const GameRoom: React.FC<GameRoomProps> = ({ socket }) => {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [shuffledCards, setShuffledCards] = useState<any>(
    shuffleArray(cardImages)
  );
  const [pickedCards] = useState<string[]>([]);
  // const [currentUser, setCurrentUser] = useState<number>(1);
  const [user1Timer] = useState<boolean>(false);
  const [user2Timer] = useState<boolean>(false);

  const [gameState, setGameState] = useState<GameState>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [gameStateAvailable, setGameStateAvailable] = useState(false);
  const [canClick, setCanClick] = useState(true);
  const [, setUser1Id] = useState<string | null>();

  const [user1Phone, setUser1Phone] = useState<number | null>();
  const [user2Phone, setUser2Phone] = useState<number | null>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // socket = io(URL);

  useEffect(() => {
    // socket = io(URL);

    if (!socket) {
      navigate("/dashboard");
    } else {
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("room", (roomId: string, gameState: GameState) => {
        setRoomId(roomId);
        setGameState(gameState);
        console.log(gameState);

        setGameStateAvailable(true);
        setUser1Id(gameState?.player1.userId);

        setUser1Phone(gameState?.player1.phoneNumber);

        console.log(`this is the room id ${gameState}`);
      });

      socket.on(
        "gameRoomUpdate",
        ({ gameRoomState }: { gameRoomState: GameState }) => {
          let player;

          if (gameRoomState?.player1.id === socket.id) {
            player = 1;
          } else {
            player = 2;
          }

          const currentPlayerSelectedCards =
            gameRoomState?.player1.cardPickedList.concat(
              gameRoomState.player2?.cardPickedList ?? []
            );

          // Filter out the selected cards from the shuffled deck
          const newShuffledList = shuffledCards.filter(
            (card: { value: number }) =>
              !currentPlayerSelectedCards?.includes(card.value)
          );

          setShuffledCards(newShuffledList);
          setGameState(gameRoomState);

          // setUser1Phone(gameState?.player1.phoneNumber);

          setCanClick(true);
        }
      );
      socket.on(
        "gameOver",
        ({ gameRoomState }: { gameRoomState: GameState }) => {
          setGameState(gameRoomState);

          setCanClick(false);
          onOpen();
          // Handle game over logic in here
        }
      );

      return () => {
        //DANGER: This should never be called
        //   socket.disconnect();
      };
    }
  }, [socket, navigate, onOpen, shuffledCards]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getTurn = () => {
    if (gameState) return gameState.turn + 1;
  };

  const getPlayer = () => {
    let player;

    if (gameState?.player1.id === socket.id) {
      player = 1;
    } else {
      player = 2;
    }
    return player;
  };
  const handlePickCard = (cardValue: number) => {
    if (getTurn() === getPlayer() && gameState !== null && canClick) {
      const updatedGameState = { ...gameState };
      updatedGameState.turn = (updatedGameState.turn + 1) % 2;
      const currentPlayer = getPlayer() === 1 ? "player1" : "player2";

      if (updatedGameState[currentPlayer]) {
        updatedGameState[currentPlayer].cardPickedSum += cardValue;
        updatedGameState[currentPlayer].cardPickedList.push(cardValue);
        updatedGameState[currentPlayer].noOfPlay++;
      }

      setUser2Phone(updatedGameState?.player2?.phoneNumber);
      if (socket && roomId) {
        socket.emit("pick", updatedGameState, roomId, cardValue);
        setCanClick(false);
      }
    }
  };
  const getUser1Cards = () => {
    if (gameState) {
      return gameState?.player1?.cardPickedList.map(
        (i) => cardImages.filter((a) => a.value === i)[0]
      );
    }
    return;
  };
  const getUser2Cards = () => {
    if (gameState) {
      return gameState?.player2?.cardPickedList.map(
        (i) => cardImages.filter((a) => a.value === i)[0]
      );
    }
    return;
  };
  const player1CardPickedSum = gameState?.player1?.cardPickedSum ?? 0;
  const player2CardPickedSum = gameState?.player2?.cardPickedSum ?? 0;
  return (
    <>
      {gameStateAvailable ? (
        <Box>
          <Flex
            flexDirection="column"
            backgroundColor="rgba(107, 57, 189, .65)"
            height="100vh"
            padding="1.5rem 1rem"
            justifyContent="space-between"
            width="100%">
            <Flex alignItems="start" justifyContent="space-evenly" wrap="wrap">
              {shuffledCards.map(
                (
                  card: { image: unknown; value?: number },
                  index: React.Key | null | undefined
                ) => (
                  <ClickableCard
                    handlePickCard={handlePickCard}
                    key={index}
                    card={card as Card}
                    picked={pickedCards.includes(card.image as string)}
                  />
                )
              )}
            </Flex>
            <Flex margin="0 auto" alignItems="center">
              {user1Timer && (
                <Countdown
                  date={Date.now() + TURN_DURATION}
                  onComplete={() => {}}
                  renderer={({ seconds }) => (
                    <Text fontSize="1rem">
                      <span
                        style={{
                          fontWeight: "900",
                          fontSize: "1.2rem",
                        }}>
                        User1
                      </span>{" "}
                      you have{" "}
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "1.2rem",
                          color: "tomato",
                        }}>
                        {seconds}
                      </span>{" "}
                      seconds to pick a card
                    </Text>
                  )}
                />
              )}
              {user2Timer && (
                <Countdown
                  date={Date.now() + TURN_DURATION}
                  onComplete={() => {}}
                  renderer={({ seconds }) => (
                    <Text fontSize="1rem">
                      <span
                        style={{
                          fontWeight: "900",
                          fontSize: "1.2rem",
                        }}>
                        {" "}
                        User2{" "}
                      </span>{" "}
                      you have{" "}
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "1.2rem",
                          color: "tomato",
                        }}>
                        {seconds}
                      </span>{" "}
                      seconds to pick a card
                    </Text>
                  )}
                />
              )}
            </Flex>
            <Flex flexDirection="column" gap="1rem">
              <Flex justifyContent="space-between" width="100%">
                <TextSumBox sum={player1CardPickedSum} />
                <TextSumBox sum={player2CardPickedSum} />
              </Flex>

              <Flex justifyContent="space-between" alignItems="center">
                <UserBox
                  profile={profile}
                  cards={getUser1Cards()}
                  name={user1Phone ? user1Phone : "loading"}
                />
                {/* <Box paddingX=".7rem">
              <Countdown
                date={startTime + GAME_DURATION}
                onComplete={handleGameEnd}
                renderer={({ seconds }) => (
                  <Flex flexDirection="column" justifyContent="center">
                    <Text fontSize=".8rem">
                      Game Ends In{" "}
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "1.2rem",
                        }}>
                        {seconds}
                      </span>{" "}
                    </Text>
                  </Flex>
                )}
              />
            </Box> */}

                <UserBox
                  profile={profile}
                  cards={getUser2Cards()}
                  name={user2Phone ? user2Phone : "loading"}
                />
              </Flex>
            </Flex>
          </Flex>
          <WinnerModal
            isOpen={isOpen}
            onClose={onClose}
            player1CardPickedSum={player1CardPickedSum}
            player2CardPickedSum={player2CardPickedSum}
          />
        </Box>
      ) : (
        <Text>Loading</Text>
      )}
    </>
  );
};

const ClickableCard: React.FC<{
  card: Card;
  picked: boolean;
  handlePickCard: (cardValue: number) => void; // Add handlePickCard prop
}> = ({ card, picked, handlePickCard }) => (
  <Image
    onClick={() => handlePickCard(card.value)} // Call handlePickCard with card value onClick
    height="6rem"
    src={picked ? card.image : back}
    alt={`Card`}
  />
);
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
  name: number | string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ profile, cards, name }) => (
  <Flex width="40%" gap=".5rem" alignItems="center">
    <Flex flexDirection="column" gap=".2rem" textAlign="center">
      <Image src={profile} height="4rem" alt={`${name}'s Image`} />
      <Text>{name}</Text>
    </Flex>
    <Flex overflowX="scroll" gap=".2rem">
      {cards &&
        (cards as Card[]).map((card, index) => (
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
  player1CardPickedSum: Sum;
  player2CardPickedSum: Sum;
}> = ({ isOpen, onClose, player1CardPickedSum, player2CardPickedSum }) => {
  let winner;
  if (player1CardPickedSum && player2CardPickedSum) {
    if (player1CardPickedSum > player2CardPickedSum) {
      winner = "User1";
    } else if (player1CardPickedSum < player2CardPickedSum) {
      winner = "User2";
    } else {
      winner = "It's a tie!";
    }
  } else {
    winner = "It's a tie!";
  }
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>THE END!!!</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex flexDirection="column" gap=".5rem">
            <Text> THE WINNER IS {winner} </Text>
            <Text>
              {winner === "User1" ? player1CardPickedSum : player2CardPickedSum}
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button onClick={() => navigate("/congrats")}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameRoom;
