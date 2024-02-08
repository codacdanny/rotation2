import { Box } from "@chakra-ui/react";
import Auth_Background from "../Major_Components/Auth_Background";
import Signup from "../Major_Components/Signup";

const SignupPage = () => {
  return (
    <Box>
      <Auth_Background>
        <Signup/>
      </Auth_Background>
    </Box>
  );
};

export default SignupPage;
