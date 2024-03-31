import {
  Button,
  Flex,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GoStop } from "react-icons/go";
import Nav from "../Minor_Components/Nav";
import adminIcon from "../assets/waitlist.svg";
import AdminTransactions from "../Major_Components/AdminTransactions";
import { useNavigate } from "react-router-dom";

const AdminDahboard = () => {
  const navigate = useNavigate();
  return (
    <Flex flexDirection="column" gap="2rem" padding=".7rem">
      <Nav />
      <Flex justifyContent="space-between" alignItems="center">
        <Button colorScheme="purple">View Wait List</Button>
        <Button
          leftIcon={<GoStop fontWeight={900} fontSize="1.1rem" />}
          colorScheme="red">
          Stop Game
        </Button>
      </Flex>
      <Flex flexDirection="column" gap="1rem">
        <Text fontWeight={400} fontSize="1.2rem">
          Quick Actions
        </Text>
        <SimpleGrid columns={4} gap="3px">
          <Button
            height="100%"
            py=".4rem"
            onClick={() => navigate("/waitlist")}>
            <VStack>
              <Image src={adminIcon} alt="button" />
              <Text> Wait list</Text>
            </VStack>
          </Button>
          <Button height="100%">
            <VStack>
              <Image src={adminIcon} alt="button" />
              <Text> Winners</Text>
            </VStack>
          </Button>
          <Button height="100%">
            <VStack>
              <Image src={adminIcon} alt="button" />
              <Text> Payments</Text>
            </VStack>
          </Button>
          <Button height="100%">
            <VStack>
              <Image src={adminIcon} alt="button" />
              <Text> Players</Text>
            </VStack>
          </Button>
        </SimpleGrid>
      </Flex>
      <AdminTransactions />
    </Flex>
  );
};

export default AdminDahboard;
