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
// import AdminDashboard from "./Pages/Admin";

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:3000/");
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
        element={socket ? <DashbordPage socket={socket} /> : null}
      />
      <Route path="pickpage" element={<PickPage />} />
      <Route path="pair" element={<PairingPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route
        path="game"
        element={socket ? <GameRoom socket={socket} /> : null}
      />
      {/* <Route path="admin" element={<AdminDashboard />} /> */}
    </Routes>
  );
}

export default App;
