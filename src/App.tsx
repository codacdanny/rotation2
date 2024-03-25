import { Route, Routes } from "react-router-dom";

import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import DashbordPage from "./Pages/DashbordPage";
import PickPage from "./Pages/PickPage";
import PairingPage from "./Pages/PairingPage";
import ProfilePage from "./Pages/ProfilePage";
import GameRoom from "./Pages/GameRoom";
// import AdminDashboard from "./Pages/Admin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard" element={<DashbordPage />} />
        <Route path="pickpage" element={<PickPage />} />
        <Route path="pair" element={<PairingPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="game" element={<GameRoom />} />
        {/* <Route path="admin" element={<AdminDashboard />} /> */}
      </Routes>
    </>
  );
}

export default App;
