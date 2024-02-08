import { Box } from "@chakra-ui/react";
import Auth_Background from "../Major_Components/Auth_Background";
import Login from "../Major_Components/Login";

const LoginPage = () => {
  return (
    <Box>
      <Auth_Background>
        <Login />
      </Auth_Background>
    </Box>
  );
};

export default LoginPage;
