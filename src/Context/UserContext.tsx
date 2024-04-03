import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios, { AxiosResponse } from "axios";

import { jwtDecode } from "jwt-decode";
interface UserDetails {
  _id: string;
  userId: string;
  email: string;
  phoneNumber: string;
  age: number;
  rcBalance: number;
  // Add other properties as needed
}
type UserContextType = {
  userDetails: UserDetails | null;
  decoded: any | null;
};

type UserProviderProps = {
  children: ReactNode;
};

// Create a context for user details
const UserContext = createContext<UserContextType>({
  userDetails: null,
  decoded: null,
});

// Create a provider component to manage user details
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [decoded, setDecoded] = useState<any>();
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      console.log(token);

      setDecoded(jwtDecode(token));

      if (token) {
        try {
          const response: AxiosResponse<{ data: UserDetails }> =
            await axios.get(
              "https://rotation2-backend.onrender.com/api/user/my-details",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          setUserDetails(response.data.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, decoded }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to access user details
export const useUser = (): UserContextType => useContext(UserContext);
