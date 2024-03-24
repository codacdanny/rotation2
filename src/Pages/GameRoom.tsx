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
import { useSocket } from "../services/Context/SocketContext";
import { io } from "socket.io-client";

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

const cardNumber = [10, 2, 3, 140, 40, 70, 80, 50, 170, 160];
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffledCardImages = shuffleArray(cardImages);

type UserCards = Card[];
type Sum = number;

const MAX_CARDS_PER_USER = 5; // Maximum number of cards each user can pick
const GAME_DURATION = 50000;
const TURN_DURATION = 5000; // 5 seconds

const GameRoom: React.FC = () => {
  const URL = "https://rotation2-backend.onrender.com/";

  let socketId;
  let socket: any;
  // const socket = io(URL, {
  //   autoConnect: false,
  // });
  // console.log(URL, socket);

  const [user1Cards, setUser1Cards] = useState<UserCards>([]);
  const [user2Cards, setUser2Cards] = useState<UserCards>([]);
  const [user1Sum, setUser1Sum] = useState<Sum>(0);
  const [user2Sum, setUser2Sum] = useState<Sum>(0);
  const [pickedCards, setPickedCards] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<number>(1);
  const [user1Timer, setUser1Timer] = useState<boolean>(false);
  const [user2Timer, setUser2Timer] = useState<boolean>(false);
  const [startTime] = useState<number>(Date.now());
  const [gameState, setGameState] = useState<any>({
    turn: 0,
    player1: {
      id: socketId,
      cardPickedList: [],
      cardPickedSum: 0,
      noOfPlay: 0,
    },
    player2: {
      id: socketId,
      cardPickedList: [],
      cardPickedSum: 0,
      noOfPlay: 0,
    },
  });
  const [roomId, setRoomId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    socket = io(URL);
    console.log(URL, socket);

    socket.on("connect", () => {
      socketId = socket;
      console.log("connected to server");
      console.log(URL, socket);
    });
    socket.on("room", (roomId: React.SetStateAction<null>) => {
      setRoomId(roomId);
    });
    socket.emit("play");
    socket.on("gameRoomUpdate", ({ gameRoomState }: { gameRoomState: unknown }) => {
      setGameState(gameRoomState);
    });
    socket.on("gameOver", ({ gameRoomState }: { gameRoomState: unknown }) => {
      // Handle game over logic
      console.log("Game Over", gameRoomState);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);
  const handleGameEnd = () => {
    console.log("timer end");
  };

  const handlePickCard = () => {
    socket.emit("pick", gameState, roomId, cardNumber);
  };

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     socketId = socket.id;
  //     console.log("connected to server");
  //   });
  //   socket.on("room", (roomId) => {
  //     setRoomId(roomId);
  //   });
  //   socket.on("gameRoomUpdate", ({ gameRoomState }) => {
  //     setGameState(gameRoomState);
  //   });
  //   socket.on("gameOver", ({ gameRoomState }) => {
  //     // Handle game over logic
  //     console.log("Game Over", gameRoomState);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // });
  // socket.on("connect", () => {
  //   socketId = socket.id;
  //   console.log("connected to server");
  // });

  return (
    <>
      <Flex
        flexDirection="column"
        backgroundColor="rgba(107, 57, 189, .65)"
        height="100vh"
        padding="1.5rem 1rem"
        justifyContent="space-between"
        width="100%">
        <Flex alignItems="start" justifyContent="space-evenly" wrap="wrap">
          {shuffledCardImages
            .filter(
              (card) =>
                !user1Cards.some((userCard) => userCard.image === card.image) &&
                !user2Cards.some((userCard) => userCard.image === card.image)
            )
            .map((card, index) => (
              <ClickableCard
                key={index}
                card={card}
                onClick={handlePickCard}
                picked={pickedCards.includes(card.image)}
              />
            ))}
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
            <TextSumBox sum={user1Sum} />
            <TextSumBox sum={user2Sum} />
          </Flex>

          <Flex justifyContent="space-between" alignItems="center">
            <UserBox profile={profile} cards={user1Cards} name="User1" />
            <Box paddingX=".7rem">
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
            </Box>

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

const ClickableCard: React.FC<{
  card: Card;
  onClick: () => void;
  picked: boolean;
}> = ({ card, onClick, picked }) => (
  <Image
    onClick={onClick}
    height="6rem"
    src={picked ? card.image : back}
    alt={`Card ${card.value}`}
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
  name: string;
}> = ({ profile, cards, name }) => (
  <Flex width="40%" gap=".5rem" alignItems="center">
    <Flex flexDirection="column" gap=".2rem" textAlign="center">
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

// const handlePickCard = (card: Card) => {
//   socket.emit("pick", card, roomId);
//   if (currentUser === 1 && user1Cards.length >= MAX_CARDS_PER_USER) {
//     alert("User 1 has reached the maximum number of cards!");
//     return;
//   }

//   if (currentUser === 2 && user2Cards.length >= MAX_CARDS_PER_USER) {
//     alert("User 2 has reached the maximum number of cards!");
//     return;
//   }

//   if (!pickedCards.includes(card.image)) {
//     const updatedPickedCards = [...pickedCards, card.image];
//     setPickedCards(updatedPickedCards);

//     if (currentUser === 1) {
//       setUser1Cards([...user1Cards, card]);
//       setUser1Sum(user1Sum + card.value);
//       setCurrentUser(2);
//       setUser1Timer(false);
//       setUser2Timer(true);
//     } else {
//       setUser2Cards([...user2Cards, card]);
//       setUser2Sum(user2Sum + card.value);
//       setCurrentUser(1);
//       setUser2Timer(false);
//       setUser1Timer(true);
//     }
//   }

//   if (currentUser === 1) {
//     setGameRoomState(
//       (prevState: {
//         player1: { cardPickedList: any; noOfPlay: number };
//         player2: { noOfPlay: number };
//         turn: any;
//       }) => {
//         const newPlayer1 = {
//           ...prevState.player1,
//           cardPickedList: [...prevState.player1.cardPickedList, card],
//           noOfPlay: prevState.player1.noOfPlay + 1,
//         };

//         return {
//           ...prevState,
//           player1: newPlayer1,
//           turn:
//             newPlayer1.noOfPlay === 5
//               ? (prevState.player2.noOfPlay + 1) % 2
//               : prevState.turn,
//         };
//       }
//     );

//     socket.emit("pick", gameRoomState, socket.id);
//   } else {
//     setGameRoomState(
//       (prevState: {
//         player2: { cardPickedList: any; noOfPlay: number };
//         player1: { noOfPlay: number };
//         turn: any;
//       }) => {
//         const newPlayer2 = {
//           ...prevState.player2,
//           cardPickedList: [...prevState.player2.cardPickedList, card],
//           noOfPlay: prevState.player2.noOfPlay + 1,
//         };

//         return {
//           ...prevState,
//           player2: newPlayer2,
//           turn:
//             newPlayer2.noOfPlay === 5
//               ? (prevState.player1.noOfPlay + 1) % 2
//               : prevState.turn,
//         };
//       }
//     );

//     socket.emit("pick", gameRoomState, socket.id);
//   }
// };
