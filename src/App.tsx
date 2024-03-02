import { Route, Routes } from "react-router-dom";

import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import DashbordPage from "./Pages/DashbordPage";
import PickPage from "./Pages/PickPage";
import PairingPage from "./Pages/PairingPage";
import ProfilePage from "./Pages/ProfilePage";
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
      </Routes>
    </>
  );
}

export default App;
