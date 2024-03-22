import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface PrimaryButtonProps {
  backgroundColor: string;
  buttonText: string;
  textColor: string;
  pageName: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  backgroundColor,
  buttonText,
  textColor,
  pageName,
}) => {
  const navigate = useNavigate();
  return (
    <Button
      fontWeight={400}
      variant="ghost"
      outline="1px solid rgba(36, 19, 63, 0.50)"
      color={textColor}
      borderRadius="10px"
      backgroundColor={backgroundColor}
      onClick={() => navigate(`/${pageName}`)}
      _hover={{
        backgroundColor: { backgroundColor },
      }}
      _active={{
        transform: "scale(1.05)",
        transition: "all .2s ease-in-out",
      }}>
      {buttonText}
    </Button>
  );
};

export default PrimaryButton;
