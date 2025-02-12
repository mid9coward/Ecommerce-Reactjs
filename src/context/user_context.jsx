import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Create a new React context for user authentication
const UserContext = React.createContext();

// Define the UserProvider component to manage authentication state
export const UserProvider = ({ children }) => {
  // Get authentication-related values and functions from Auth0
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading, error } =
    useAuth0();

  // State to store the current user information
  const [myUser, setMyUser] = useState(null);

  // Update myUser whenever the authentication status changes
  useEffect(() => {
    setMyUser(user); // Set myUser to the Auth0 user object when authenticated
  }, [isAuthenticated]); // Runs whenever isAuthenticated changes

  return (
    // Provide authentication-related values to child components
    <UserContext.Provider
      value={{ loginWithRedirect, logout, myUser, isLoading, error }}
    >
      {children} {/* Render child components inside the provider */}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext in other components
export const useUserContext = () => {
  return useContext(UserContext);
};
