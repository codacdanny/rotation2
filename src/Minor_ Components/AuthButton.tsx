import { Button } from "@chakra-ui/react";
import React from "react";

type AuthButtonProps = {
  buttonText: string;
};

const AuthButton: React.FC<AuthButtonProps> = ({ buttonText }) => {
  return (
    <Button
      borderRadius="30px"
      width="fit-content"
      margin="1rem auto"
      padding="1rem 2.5rem"
      backgroundColor="#6B39BD"
      color="#F7F7F7">
      {buttonText}
    </Button>
  );
};

export default AuthButton;
