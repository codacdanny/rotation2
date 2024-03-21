import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

type AuthButtonProps = {
  buttonText: string;
};

const AuthButton: React.FC<AuthButtonProps> = ({ buttonText }) => {
  const navigate = useNavigate();
  return (
    <Button
      borderRadius="30px"
      width="fit-content"
      margin="1rem auto"
      padding="1rem 2.5rem"
      backgroundColor="#6B39BD"
      color="#F7F7F7"
      onClick={() => navigate(`/dashboard`)}
      _hover={{
        backgroundColor: "#6B39BD",
      }}
      _active={{
        transform: "scale(1.05)",
        transition: "all .2s ease-in-out",
      }}>
      {buttonText}
    </Button>
  );
};

export default AuthButton;
