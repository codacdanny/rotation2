import { Box } from "@chakra-ui/react";
import Nav from "../Minor_ Components/Nav";
import DebitCard from "../Minor_ Components/DebitCard";

const DashbordPage = () => {
  return (
    <Box backgroundColor="#F7F7F7" height="100%">
      <Nav />
      <DebitCard />
    </Box>
  );
};

export default DashbordPage;
