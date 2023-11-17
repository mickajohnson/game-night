import React, { useState, createContext, useContext, useEffect } from "react";
import useLocalStorage from "beautiful-react-hooks/useLocalStorage";

const UsernameContext = createContext();

function UsernameProvider({ children }) {
  const [savedUser, setSavedUser] = useLocalStorage("game-night-user", null);

  const [username, setUsername] = useState(savedUser);

  useEffect(() => {
    if (username !== savedUser) {
      setSavedUser(username);
    }
  }, [username, savedUser]);

  const value = { username, setUsername };
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
