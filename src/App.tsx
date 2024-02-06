import { ChakraProvider } from "@chakra-ui/react";
import Signup from "./Pages/Signup";
function App() {
  return (
    <ChakraProvider>
      <Signup />
    </ChakraProvider>
  );
}

export default App;
