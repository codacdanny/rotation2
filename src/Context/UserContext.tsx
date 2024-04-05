import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

import { jwtDecode } from "jwt-decode";
interface UserDetails {
  data: SetStateAction<UserDetails>;
  _id: string;
  userId: string;
  email: string;
  phoneNumber: string;
  age: number;
  rcBalance: number;
  // Add other properties as needed
}
type UserAccountDetails = {
  data: SetStateAction<UserAccountDetails>;
  bankName: string;
  accountName: string;
  accountNumber: string;
};
type UserContextType = {
  userDetails: UserDetails | null;
  decoded: unknown | null;
  accountDetails: UserAccountDetails | null;
};

type UserProviderProps = {
  children: ReactNode;
};

// Create a context for user details
const UserContext = createContext<UserContextType>({
  userDetails: null,
  decoded: null,
  accountDetails: null,
});

// Create a provider component to manage user details
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [accountDetails, setAccountDetails] =
    useState<UserAccountDetails | null>(null);
  const [decoded, setDecoded] = useState<any>();
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      setDecoded(jwtDecode(token));

      if (token) {
        try {
          // Make the first API call to fetch user details
          const userDetailsResponse = axios.get<UserDetails>(
            "https://rotation2-backend.onrender.com/api/user/my-details",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Make the second API call to fetch account details
          let accountDetailsData = null;
          try {
            const accountDetailsResponse = axios.get<UserAccountDetails>(
              "https://rotation2-backend.onrender.com/api/user/account",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            accountDetailsData = (await accountDetailsResponse).data.data;
          } catch (accountError) {
            console.error("Error fetching account details:", accountError);
          }

          // Wait for the user details API call to resolve
          const userDetailsData = (await userDetailsResponse).data.data;

          // Set the user details and account details states
          setUserDetails(userDetailsData);
          setAccountDetails(accountDetailsData);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <UserContext.Provider value={{ userDetails, decoded, accountDetails }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to access user details
export const useUser = (): UserContextType => useContext(UserContext);
