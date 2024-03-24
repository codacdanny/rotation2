import React, { createContext, ReactNode, useContext } from "react";
import { io, Socket } from "socket.io-client";

const URL = "http://localhost:3000/";

const SocketContext = createContext<Socket | null>(null);
const socket = io(URL, {
  autoConnect: false,
});

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}

// export function useRoomId() {
//   const [roomId, setRoomId] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch or generate roomId logic goes here
//     // For simplicity, let's assume it's fetched from somewhere
//     socket.on("connect", () => {});
//     const fetchedRoomId = "your_fetched_room_id_here";
//     setRoomId(fetchedRoomId);
//   }, []);

//   return roomId;
// }

// export function useGameState() {
//   const [gameState, setGameState] = useState<any>({});

//   // Fetch or initialize game state logic goes here

//   return gameState;
// }

// import React, { createContext, ReactNode, useContext } from "react";
// import { io, Socket } from "socket.io-client";

// // Define the URL for your socket server
// const URL = "https://rotation2-backend.onrender.com/";

// // Create a context for the socket
// export const SocketContext = createContext<Socket | null>(null);

// // Initialize the socket instance with autoConnect set to false
// export const socket = io(URL, {
//   autoConnect: true,
// });
// type GameSocketContextProps = {
//   children: ReactNode; // ReactNode allows any JSX to be passed as children
// };
// // Wrap your component with the context provider
// const GameSocketContext: React.FC<GameSocketContextProps> = ({ children }) => {
//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };

// // Create a custom hook to access the socket instance
// export function useSocket() {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error("useSocket must be used within a SocketContext.Provider");
//   }
//   return context;
// }

// export default GameSocketContext;
