import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthButton from "../Minor_Components/AuthButton";
import { ChangeEvent, FormEvent, useState } from "react";

type FormData = {
  email: string;
  phoneNumber: string;
  age: string;
  state: string;
  password: string;
  confirmPassword: string;
  referralID: string;
  gender: "male" | "female";
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
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phoneNumber: "",
    age: "",
    state: "",
    password: "",
    confirmPassword: "",
    referralID: "",
    gender: "male", // Default to male
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send formData to the backend
    console.log(formData);
    // You can make a fetch request or use any library like Axios to send data to the backend here
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
              type="tel"
              placeholder="8156438250"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
          <Input
            type="number"
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

        <RadioGroup
          name="gender"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginY="1rem"
          value={formData.gender}
          onChange={(value) =>
            setFormData({ ...formData, gender: value as "male" | "female" })
          }>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </RadioGroup>
        <Box textAlign="center">
          <AuthButton buttonText="Sign Up" />
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
