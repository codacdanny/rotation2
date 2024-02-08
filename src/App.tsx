import { ChakraProvider } from "@chakra-ui/react";
import SignupPage from "./Pages/Signup";
function App() {
  return (
    <ChakraProvider>
      <SignupPage />
    </ChakraProvider>
  );
}

export default App;
