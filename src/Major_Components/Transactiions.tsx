import { Box, Flex, Text, IconButton, Image } from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import deposit from "../assets/deposit.svg";
import withdraw from "../assets/withdraw.svg";

const Transactions: React.FC = () => {
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

      <TransactionDetail
        title="Top Up"
        amount="4,000.00"
        date="05/02/2023"
        type="deposit"
      />
      <TransactionDetail
        title="Withdrawal"
        amount="3,000.00"
        date="09/04/2023"
        type="withdrawal"
      />
      <TransactionDetail
        title="Top Up"
        amount="4,000.00"
        date="05/02/2023"
        type="deposit"
      />
      <TransactionDetail
        title="Top Up"
        amount="4,000.00"
        date="05/02/2023"
        type="deposit"
      />
    </Box>
  );
};

export default Transactions;

interface TransactionDetailsProps {
  title: string;
  amount: string;
  date: string;
  type: "deposit" | "withdrawal";
}

const TransactionDetail: React.FC<TransactionDetailsProps> = ({
  title,
  amount,
  date,
  type,
}) => {
  return (
    <Flex justifyContent="space-between" marginY="1.5rem" alignItems="center">
      <Flex gap="2rem">
        <Image
          src={type === "deposit" ? deposit : withdraw}
          padding="1rem"
          outline="1px solid rgba(36, 19, 63, 0.50)"
          borderRadius="16px"
          backgroundColor={type === "withdrawal" ? "#24133F" : "transparent"}
        />
        <Flex flexDirection="column" justifyContent="center">
          <Text color="#24133" fontSize="1rem" fontWeight="500">
            {title}
          </Text>
          <Text
            color="rgba(36, 19, 63, 0.70)"
            fontSize="0.7rem"
            fontWeight="300">
            {date}
          </Text>
        </Flex>
      </Flex>
      <Text
        color={type === "deposit" ? "#24133" : "#24133F"}
        fontSize="1rem"
        fontWeight="500">
        {type === "deposit" ? `+${amount}` : `-${amount}`}
      </Text>
    </Flex>
  );
};
