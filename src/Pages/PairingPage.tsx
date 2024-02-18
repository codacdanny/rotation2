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
import { BsArrowRight } from "react-icons/bs";
import user from "../assets/user.svg";
import setting from "../assets/setting-2.svg";
import favourite from "../assets/star.svg";
import notification from "../assets/notification-bing.svg";
import User from "../Minor_Components/User";

const WelcomeSection: React.FC = () => (
  <Flex flexDirection="column" color="#24133F" alignItems="center">
    <Heading textAlign="center">
      Please be patient while you we pick an opponent for you
    </Heading>
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
  return (
    <Box
      paddingY="2rem"
      paddingX="1rem"
      height="100%"
      bgGradient="linear-gradient(180deg, #E1D7F2 0%, rgba(107, 57, 189, 0.20) 53.96%, rgba(225, 215, 242, 0.00) 100%)">
      <WelcomeSection />
      <CircularProgressSection />
      <Flex>
        <User />
        <BsArrowRight />
        <User />
      </Flex>
    </Box>
  );
};

export default PairingPage;
