import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Nav from "../Minor_Components/Nav";
import adminIcon from "../assets/waitlist.svg";
import Transactions from "../Major_Components/Transactiions";

const AdminDahboard = () => {
  return (
    <Box padding="1rem 1.5rem">
      <Nav />
      <Flex justifyContent="space-between" alignItems="center">
        <Button>View Wait List</Button>
        <Button>Stop Game</Button>
      </Flex>
      <Text>Quick Actions</Text>
      <SimpleGrid columns={4}>
        <Button>
          <VStack>
            <Image src={adminIcon} alt="button" />
            <Text> Wait list</Text>
          </VStack>
        </Button>
        <Button>
          <VStack>
            <Image src={adminIcon} alt="button" />
            <Text> Winners</Text>
          </VStack>
        </Button>
        <Button>
          <VStack>
            <Image src={adminIcon} alt="button" />
            <Text> Payments</Text>
          </VStack>
        </Button>
        <Button>
          <VStack>
            <Image src={adminIcon} alt="button" />
            <Text> Players</Text>
          </VStack>
        </Button>
      </SimpleGrid>
      <Transactions />
      <Transactions />
    </Box>
  );
};

export default AdminDahboard;
