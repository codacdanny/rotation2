import { Button } from "@chakra-ui/react";

interface PrimaryButtonProps {
  backgroundColor: string;
  buttonText: string;
  textColor: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  backgroundColor,
  buttonText,
  textColor,
}) => {
  return (
    <Button
      fontWeight={400}
      variant="ghost"
      outline="1px solid rgba(36, 19, 63, 0.50)"
      color={textColor}
      borderRadius="10px"
      backgroundColor={backgroundColor}
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
