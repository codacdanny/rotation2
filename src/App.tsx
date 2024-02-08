import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
