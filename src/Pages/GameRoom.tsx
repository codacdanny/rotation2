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
import { io, Socket } from "socket.io-client";

type Card = {
    image: string;
    value: number;
};
type GameState = {
    turn: number;
    player1: {
        id: string;
        cardPickedList: number[];
        cardPickedSum: number;
        noOfPlay: number;
    };
    player2: {
        id: string;
        cardPickedList: number[];
        cardPickedSum: number;
        noOfPlay: number;
    };
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

const shuffleArray = (array: Card[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const shuffledCardImages: Card[] = shuffleArray(cardImages);
type UserCards = Card[];
type Sum = number;

// const MAX_CARDS_PER_USER = 5; // Maximum number of cards each user can pick
const GAME_DURATION = 1200000;
const TURN_DURATION = 15000; // 5 seconds

const GameRoom: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user1Cards, setUser1Cards] = useState < any > ([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user2Cards, setUser2Cards] = useState < any > ([]);
    const [user1Sum, setUser1Sum] = useState < Sum > (0);
    const [user2Sum, setUser2Sum] = useState < Sum > (0);
    const [pickedCards] = useState < string[] > ([]);
    // const [currentUser, setCurrentUser] = useState<number>(1);
    const [user1Timer] = useState < boolean > (false);
    const [user2Timer] = useState < boolean > (false);
    const [startTime] = useState < number > (Date.now());
    const [socket, setSocket] = useState < Socket > ();
    const [gameState, setGameState] = useState < GameState > ({
        turn: 0,
        player1: { id: "", cardPickedList: [], cardPickedSum: 0, noOfPlay: 0 },
        player2: { id: "", cardPickedList: [], cardPickedSum: 0, noOfPlay: 0 },
    });
    const [roomId, setRoomId] = useState < string | null > (null);
    const { isOpen, onClose } = useDisclosure();
    // socket = io(URL);
    useEffect(() => {
        // socket = io(URL);
        const URL = "https://rotation2-backend.onrender.com/";
        const socketInstance = io(URL);
        setSocket(socketInstance);

        socketInstance.on("connect", () => {
            console.log("Connected to server");
        });
        socketInstance.on("room", (roomId: string) => {
            setRoomId(roomId);
        });

        socketInstance.on(
            "gameRoomUpdate",
            ({ gameRoomState }: { gameRoomState: GameState }) => {
                setGameState(gameRoomState);
                // Update user cards and sums when game state is received
                setUser1Cards(gameRoomState.player1.cardPickedList);
                setUser2Cards(gameRoomState.player2.cardPickedList);
                setUser1Sum(gameRoomState.player1.cardPickedSum);
                setUser2Sum(gameRoomState.player2.cardPickedSum);
            }
        );
        socketInstance.on(
            "gameOver",
            ({ gameRoomState }: { gameRoomState: GameState }) => {
                console.log("Game Over", gameRoomState);
                // Handle game over logic here
            }
        );

        return () => {
            socketInstance.disconnect();
        };
    }, []);
    const handleGameEnd = () => {
        console.log("timer end");
    };

    const handlePickCard = (cardValue: number) => {
        const updatedGameState = { ...gameState };
        updatedGameState.turn = updatedGameState.turn % 2;
        const currentPlayer = `player${updatedGameState.turn + 1}` as
            | "player1"
            | "player2";
        updatedGameState[currentPlayer].cardPickedSum += cardValue;
        updatedGameState[currentPlayer].cardPickedList.push(cardValue);
        updatedGameState[currentPlayer].noOfPlay++;
        setGameState(updatedGameState); // Update local state

        if (socket && roomId) {
            socket.emit("pick", updatedGameState, roomId, cardValue);
        }

        // Update user cards and sums locally
        if (currentPlayer === "player1") {
            setUser1Cards([
                ...user1Cards,
                { image: cardImages[cardValue - 1].image, value: cardValue },
            ]);
            setUser1Sum(user1Sum + cardValue);
        } else {
            setUser2Cards([
                ...user2Cards,
                { image: cardImages[cardValue - 1].image, value: cardValue },
            ]);
            setUser2Sum(user2Sum + cardValue);
        }
    };
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
                                !user1Cards.some(
                                    (userCard: { image: string }) => userCard.image === card.image
                                ) &&
                                !user2Cards.some(
                                    (userCard: { image: string }) => userCard.image === card.image
                                )
                        )
                        .map((card, index) => (
                            <ClickableCard
                                handlePickCard={handlePickCard}
                                key={index}
                                card={card}
                                picked={pickedCards.includes(card.image)}
                            />
                        ))}
                </Flex>
                <Flex margin="0 auto" alignItems="center">
                    {user1Timer && (
                        <Countdown
                            date={Date.now() + TURN_DURATION}
                            onComplete={() => { }}
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
                            onComplete={() => { }}
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
    picked: boolean;
    handlePickCard: (cardValue: number) => void; // Add handlePickCard prop
}> = ({ card, picked, handlePickCard }) => (
    <Image
        onClick={() => handlePickCard(card.value)} // Call handlePickCard with card value onClick
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
