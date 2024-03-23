import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.tsx";
import { SocketProvider } from "./services/Context/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SocketProvider>
        <Router>
          <App />
        </Router>
      </SocketProvider>
    </ChakraProvider>
  </React.StrictMode>
);
