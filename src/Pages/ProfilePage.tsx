import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Page_Backround from "../Major_Components/Page_Background";
import profile from "../assets/profileImage.svg";
import { useRef } from "react";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    email: "fetchemail@gmail.com",
    username: "Fetch username",
    accountName: "",
    accountNumber: "",
    bankName: "",
  });

  const profileActions = [
    { label: "Delete Account", value: "Delete your rotation 2 account" },
    {
      label: "Restrict account",
      value: "Stop transactions in emergency situations",
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddBankDetails = (formData: BankDetailsFormData) => {
    const updatedUserData = {
      ...userData,
      accountName: formData.accountName,
      accountNumber: formData.accountNumber,
      bankName: formData.bankName,
    };

    // Persist data (e.g., call API to update user info)
    // Update state with the new user data
    setUserData(updatedUserData);

    onClose(); // Close modal after successful submission
  };

  const hasBankDetails =
    userData.accountName && userData.accountNumber.length === 10;

  return (
    <Page_Backround>
      <Flex color="#24133F" flexDirection="column">
        <Flex
          alignItems="center"
          textAlign="center"
          color="#24133F"
          flexDirection="column"
          gap=".7rem">
          <Heading fontSize="1.5rem">Profile</Heading>
          <Image
            src={profile}
            alt="profile picture"
            boxSize="fit-content"
            objectFit="cover"
            height="6rem"
          />
          <Heading fontSize="2rem"> UserID </Heading>
          <Text>Highest level Attained: level 3</Text>
        </Flex>
        <Flex flexDirection="column" gap="1rem" marginY="2rem">
          {Object.entries(userData).map(([label, value]) => (
            <Flex key={label} flexDirection="column">
              <Text fontSize=".8rem">{label}</Text>
              <Text>{value}</Text>
            </Flex>
          ))}
          {!hasBankDetails && (
            <Button
              colorScheme="purple"
              onClick={onOpen}
              disabled={!hasBankDetails}>
              Add Account Details
            </Button>
          )}
          {/* {hasBankDetails && (
            <Flex flexDirection="column">
              <Text fontSize=".8rem">Account Name</Text>
              <Text>{userData.accountName}</Text>
              <Text fontSize=".8rem">Account Number</Text>
              <Text>{userData.accountNumber}</Text>
              <Text fontSize=".8rem">Bank Name</Text>
              <Text>{userData.bankName}</Text>
            </Flex>
          )} */}
        </Flex>
        <Box gap="1rem">
          {profileActions.map((action) => (
            <Flex key={action.label} flexDirection="column" my="1rem">
              <Text color="#F44336">{action.label}</Text>
              <Text fontSize=".8rem" fontWeight="300">
                {action.value}
              </Text>
            </Flex>
          ))}
          <Button
            my="1rem"
            variant="link"
            colorScheme="transparent"
            color="#24133F"
            textAlign="left">
            Logout
          </Button>
        </Box>
      </Flex>

      <AddBankDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleAddBankDetails}
      />
    </Page_Backround>
  );
};

export default ProfilePage;

interface BankDetailsFormData {
  accountName: string;
  accountNumber: string;
  bankName: string;
}

const AddBankDetailsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BankDetailsFormData) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const initialRef = useRef(null);
  const [formData, setFormData] = useState<BankDetailsFormData>({
    accountName: "",
    accountNumber: "",
    bankName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Bank Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={4}>
            <FormLabel htmlFor="accountName">Account Name</FormLabel>
            <Input
              ref={initialRef}
              id="accountName"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              placeholder="Enter Account Name"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="accountNumber">Account Number</FormLabel>
            <Input
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Enter Account Number"
              maxLength={10}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="bankName">Bank Name</FormLabel>
            <Input
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Enter Bank Name"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={() => onSubmit(formData)}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
