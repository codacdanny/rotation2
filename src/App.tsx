import { Route, Routes } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import DashbordPage from "./Pages/DashbordPage";
import PickPage from "./Pages/PickPage";
import PairingPage from "./Pages/PairingPage";
import ProfilePage from "./Pages/ProfilePage";
import GameRoom from "./Pages/GameRoom";
import { useEffect, useState } from "react";
import Winners from "./Pages/Winners";
import Players from "./Pages/Players";
import ProtectedRoute from "./Major_Components/ProtectedRoute";
import Congratulations from "./Pages/Congratulations";
import Loser from "./Pages/Loser";

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io("https://rotation2-backend.onrender.com/");
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);
  return (
    <Routes>
      <Route path="/" element={<SignupPage />} />
      <Route path="login" element={<LoginPage />} />

      <Route
        path="dashboard"
        element={
          socket ? (
            <ProtectedRoute>
              <DashbordPage socket={socket} />
            </ProtectedRoute>
          ) : null
        }
      />

      <Route
        path="pickpage"
        element={
          <ProtectedRoute>
            <PickPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="pair"
        element={
          <ProtectedRoute>
            <PairingPage socket={socket} />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="game"
        element={
          socket ? (
            <ProtectedRoute>
              <GameRoom socket={socket} />
            </ProtectedRoute>
          ) : null
        }
      />
      <Route
        path="winners"
        element={
          <ProtectedRoute>
            <Winners />
          </ProtectedRoute>
        }
      />
      <Route
        path="players"
        element={
          <ProtectedRoute>
            <Players />
          </ProtectedRoute>
        }
      />
      <Route
        path="congrats"
        element={
          <ProtectedRoute>
            <Congratulations socket={socket} />
          </ProtectedRoute>
        }
      />
      <Route
        path="loser"
        element={
          <ProtectedRoute>
            <Loser socket={socket} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
