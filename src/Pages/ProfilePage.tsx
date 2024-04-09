import React, { MouseEventHandler, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import Page_Backround from "../Major_Components/Page_Background";
import profile from "../assets/profileImage.svg";
import { useRef } from "react";
import { useUser } from "../Context/UserContext";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { userDetails, accountDetails } = useUser();

  const [userData, setUserData] = useState({
    Email: userDetails?.email || '',
    Username: userDetails?.userId || '',
    BankName: accountDetails?.bankName || '',
    AccountName: accountDetails?.accountName || '',
    AccountNumber: accountDetails?.accountNumber || '',
    ReferralLink: `https://rotation2.vercel.app/?referalid=${userDetails?.userId}`,
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
      AccountName: formData.accountName,
      AccountNumber: formData.accountNumber,
      BankName: formData.bankName,
    };

    setUserData(updatedUserData);

    onClose();
    toast({
      title: "Account Details Added.",
      description: "We've added your Bank details",
      status: "success",
      duration: 9000,
      position: "top-right",
      isClosable: true,
    });
    navigate("/dashboard");
  };

  const hasBankDetails =
    accountDetails?.accountName !== "" &&
    accountDetails?.accountNumber !== "" &&
    accountDetails?.bankName !== "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
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
          <Heading fontSize="2rem"> {userData.Username} </Heading>
          <Text>Highest level Attained: level 3</Text>
        </Flex>
        <Flex flexDirection="column" gap="1rem" marginY="2rem">
          {Object.entries(userData).map(([label, value]) => (
            <Flex key={label} flexDirection="column">
              <Text fontSize=".8rem">{label}</Text>
              <Text fontWeight={600}>{value}</Text>
            </Flex>
          ))}
        </Flex>
        {!hasBankDetails && (
          <Button
            colorScheme="purple"
            onClick={onOpen}
            disabled={!hasBankDetails}>
            Add Account Details
          </Button>
        )}
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
            onClick={handleLogout}
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
  const toast = useToast();
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
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (
      formData.accountName.trim() === "" ||
      formData.accountNumber.trim() === "" ||
      formData.bankName.trim() === ""
    ) {
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (
      formData.accountNumber.trim().length !== 10 ||
      isNaN(Number(formData.accountNumber))
    ) {
      toast({
        title: "Error",
        description: "Account number must be 10 digits.",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const token = localStorage.getItem("token");
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        "https://rotation2-backend.onrender.com/api/user/add-account-details",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );
     
    } catch (error: any) {
      console.error((error as AxiosError).response?.data);
      toast({
        title: "Error",
        description: error.response?.data.msg || "connection error",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    }
    onSubmit(formData);
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
          <Button colorScheme="teal" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
