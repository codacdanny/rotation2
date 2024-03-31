import { Box, Flex, Grid, GridItem, IconButton, Text } from "@chakra-ui/react";
import { GoCheck } from "react-icons/go";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";

const AdminTransactions = () => {
  return (
    <Box>
      <Flex marginY="2rem" justifyContent="space-between" alignItems="center">
        <Text color="#24133F" fontWeight="500" fontSize="1.4rem">
          Transactions History
        </Text>
        <IconButton
          icon={<AiOutlineArrowRight color="#24133F" size="1.56rem" />}
          variant="ghost"
          colorScheme="transparent"
          aria-label="view balance"
        />
      </Flex>
      <Flex flexDirection="column" gap="1rem">
        <AdminTransactionDetails
          userId="Userab1C"
          amount="4000"
          date="04/02/2024"
        />
        <AdminTransactionDetails
          userId="User31av"
          amount="1600"
          date="04/02/2024"
        />
        <AdminTransactionDetails
          userId="User31av"
          amount="1600"
          date="04/02/2024"
        />
        <AdminTransactionDetails
          userId="User31av"
          amount="1600"
          date="04/02/2024"
        />
        <AdminTransactionDetails
          userId="User31av"
          amount="1600"
          date="04/02/2024"
        />
        <AdminTransactionDetails
          userId="User31av"
          amount="1600"
          date="04/02/2024"
        />
      </Flex>
    </Box>
  );
};

export default AdminTransactions;

type TransactionProps = {
  userId: string;
  amount: string;
  date: string;
};
const AdminTransactionDetails: React.FC<TransactionProps> = ({
  userId,
  amount,
  date,
}) => {
  const [paid, setPaid] = useState<boolean>(true);

  return (
    <Grid templateColumns="repeat(5, 1fr)" alignItems="center">
      <GridItem colSpan={1}>
        <IconButton
          border="1px solid #bab8b8"
          padding="1.5rem .7rem"
          borderRadius="16px"
          aria-label="Check Payment"
          colorScheme="transparent"
          onClick={() => setPaid(!paid)}
          icon={
            paid ? (
              <GoCheck color="#000" fontWeight={600} fontSize="2rem" />
            ) : (
              <Box paddingX="1rem" />
            )
          }
        />
      </GridItem>
      <GridItem colSpan={3}>
        <Flex flexDirection="column" justifyContent="center">
          <Flex gap=".7rem">
            <Text color="#24133" fontSize="1rem" fontWeight="500">
              {userId}
            </Text>
            <Text>{paid ? `+${amount}` : `${amount}`}</Text>
          </Flex>

          <Text
            color="rgba(36, 19, 63, 0.70)"
            fontSize="0.7rem"
            fontWeight="300">
            {date}
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={1}>
        {paid ? (
          <Text color="#805ad5" fontWeight="500">
            Paid
          </Text>
        ) : (
          <Text color="red" fontWeight="500">
            Pending
          </Text>
        )}
      </GridItem>
    </Grid>
  );
};
