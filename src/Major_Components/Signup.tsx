import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
// import AuthButton from "../Minor_Components/AuthButton";
import { ChangeEvent, FormEventHandler, useState } from "react";

type FormData = {
  email: string;
  phoneNumber: string;
  age: string;
  state: string;
  password: string;
  confirmPassword: string;
  referralID: string;
};

const statesInNigeria: string[] = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phoneNumber: "",
    age: "",
    state: "",
    password: "",
    confirmPassword: "",
    referralID: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (
      formData.referralID !== "dualmainRC" &&
      formData.referralID !== "monomainRC"
    ) {
      toast({
        title: "Error",
        description: "Wrong referral ID",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (parseInt(formData.age) < 18) {
      toast({
        title: "Error",
        description: "You must be 18 or older to sign up",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (formData.phoneNumber.length > 11 || formData.phoneNumber.length < 10) {
      toast({
        title: "Error",
        description: "Invalid phone number",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (formData.phoneNumber.length === 11) {
      formData.phoneNumber = formData.phoneNumber.slice(1);
    }
    try {
      const response = await axios.post(
        "https://rotation2-backend.onrender.com/api/user/register",
        formData
      );
      console.log(response.data);
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  };
  return (
    <Flex
      backgroundColor="#F7F7F7"
      flexDirection="column"
      paddingY="2rem"
      paddingX="1rem"
      marginTop="5rem">
      <Heading
        as="h3"
        fontSize="1.5rem"
        textAlign="center"
        marginBottom="2.5rem"
        fontWeight="500">
        Create Account
      </Heading>
      <form onSubmit={handleSubmit}>
        <Flex flexDirection="column" gap="2rem">
          <Input
            variant="flushed"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <InputGroup variant="flushed" gap=".5rem">
            <InputLeftAddon>+234</InputLeftAddon>
            <Input
              placeholder="8156438250"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
          <Input
            variant="flushed"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          <Select
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required>
            {statesInNigeria.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>
          <Input
            type="password"
            variant="flushed"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Input
            type="password"
            variant="flushed"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <Input
            variant="flushed"
            placeholder="Referral ID"
            name="referralID"
            value={formData.referralID}
            onChange={handleInputChange}
            required
          />
        </Flex>

        <Box textAlign="center">
          {/* <AuthButton buttonText="Sign Up" /> */}
          <Button
            type="submit"
            borderRadius="30px"
            width="fit-content"
            margin="1rem auto"
            padding="1rem 2.5rem"
            backgroundColor="#6B39BD"
            color="#F7F7F7"
            // onClick={() => navigate("/dashboard")}
            _hover={{
              backgroundColor: "#6B39BD",
            }}
            _active={{
              transform: "scale(1.05)",
              transition: "all .2s ease-in-out",
            }}>
            Sign Up
          </Button>
        </Box>
        <Flex
          gap=".5rem"
          justifyContent="center"
          fontSize=".8rem"
          marginY=".5rem">
          <Text fontWeight="400">Already have an account?</Text>
          <Link to="/login">Login</Link>
        </Flex>
      </form>
    </Flex>
  );
};

export default Signup;
