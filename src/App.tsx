import { Route, Routes } from "react-router-dom";

import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
