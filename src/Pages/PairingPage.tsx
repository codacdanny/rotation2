import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { AiOutlineLeft } from "react-icons/ai";
import user from "../assets/user.svg";
import setting from "../assets/setting-2.svg";
import favourite from "../assets/star.svg";
import notification from "../assets/notification-bing.svg";

const WelcomeSection: React.FC = () => (
  <Flex flexDirection="column" color="#24133F" alignItems="center" gap="2rem">
    <Heading textAlign="center">Welcome to the grand experience</Heading>
  </Flex>
);

const CircularProgressSection: React.FC = () => (
  <CircularProgress
    value={75}
    size="180px"
    color="#24133F"
    trackColor="#ded5e8">
    <CircularProgressLabel color="#24133F" fontSize="2rem" fontWeight="500">
      75%
    </CircularProgressLabel>
  </CircularProgress>
);
const FlexSection: React.FC = () => (
  <Flex justifyContent="space-between">
    <Flex
      flexDirection="column"
      alignItems="left"
      gap="1rem"
      marginLeft="-1rem">
      <IconButtonSection icon={user} alt="headshot" />
      <IconButtonSection icon={setting} alt="headshot" />
      <IconButtonSection icon={favourite} alt="headshot" />
      <IconButtonSection icon={notification} alt="headshot" />
    </Flex>
    <Flex alignItems="end" fontWeight="600" color="#24133F">
      <AiOutlineLeft size="20px" />
      <Text>Back</Text>
    </Flex>
  </Flex>
);

const IconButtonSection: React.FC<{ icon: string; alt: string }> = ({
  icon,
  alt,
}) => (
  <Button variant="ghost" colorScheme="transparent">
    <Image src={icon} alt={alt} boxSize="30px" />
  </Button>
);
const PairingPage = () => {
  return <Box></Box>;
};

export default PairingPage;
