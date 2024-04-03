import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios, { AxiosResponse } from "axios";

interface UserDetails {
  _id: string;
  userId: string;
  email: string;
  phoneNumber: string;
  age: number;
  rcBalance: number;
  // Add other properties as needed
}

type UserProviderProps = {
  children: ReactNode;
};
// Create a context for user details
const UserContext = createContext<UserDetails | null>(null);

// Create a provider component to manage user details
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

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
    <UserContext.Provider value={userDetails}>{children}</UserContext.Provider>
  );
};

// Create a custom hook to access user details
export const useUser = (): UserDetails | null => useContext(UserContext);
