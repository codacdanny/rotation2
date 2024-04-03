import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.tsx";
import { UserProvider } from "./Context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);
