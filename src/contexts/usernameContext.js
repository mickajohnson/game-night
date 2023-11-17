import React, { useState, createContext, useContext, useEffect } from "react";
import useLocalStorage from "beautiful-react-hooks/useLocalStorage";
import { useRouter } from "next/router";

const UsernameContext = createContext();

function UsernameProvider({ children }) {
  const [savedUser, setSavedUser] = useLocalStorage("game-night-user", null);

  const [username, setUsername] = useState(savedUser);
  const router = useRouter();

  const login = (newUsername) => {
    setSavedUser(username);
    setUsername(newUsername);
    router.push("/games");
  };

  const logout = () => {
    setSavedUser(null);
    setUsername(null);
    router.push("/username");
  };

  const value = { username, login, logout };
  return (
    <UsernameContext.Provider value={value}>
      {children}
    </UsernameContext.Provider>
  );
}

function useUsername() {
  const context = useContext(UsernameContext);
  if (context === undefined) {
    throw new Error("useUsername must be used within a UsernameProvider");
  }
  return context;
}

export { UsernameProvider, useUsername };
