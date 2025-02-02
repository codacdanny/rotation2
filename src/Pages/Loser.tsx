import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Page_Backround from "../Major_Components/Page_Background";
import profile from "../assets/profileImage.svg";
import { useLocation, useNavigate } from "react-router-dom";
const Loser = ({ socket }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const loser = queryParams.get("loser");
  // const level = queryParams.get("level");
  const points = queryParams.get("points");
  console.log(loser);
  const handleHome = () => {
    // if (socket) {
    //   socket.emit("loser", loser);
    // }
    navigate("/dashboard");
  };
  return (
    <Page_Backround>
      <Box
        height="100%"
        p="1rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="3rem">
        <Box textAlign="center">
          <Heading my="2rem" color="#24133F">
            Sorry You lost
          </Heading>
          <Text color="#24133F" textAlign="center">
            Well played Champ, see you next time
          </Text>
        </Box>
        <Box>
          <Image
            src={profile}
            height="4rem"
            alt="Loser Image"
            outline="7px solid red"
            borderRadius="50%"
          />
        </Box>
        <Box
          my="4rem"
          borderRadius="6px"
          width="fit-content"
          color="#fff"
          bgGradient="linear-gradient(to right, #6B39BD, #24133F, #5D32A5)"
          padding="1rem">
          you had {points} point
        </Box>
        <Flex justifyContent="space-between">
          <Button
            colorScheme="transparent"
            color="#24133F"
            onClick={handleHome}>
            Go to DashbordPage
          </Button>
        </Flex>
      </Box>
    </Page_Backround>
  );
};

export default Loser;
