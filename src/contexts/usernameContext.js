import React, { useState, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const UsernameContext = createContext();

function UsernameProvider({ children }) {
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let username = localStorage.getItem("username");

      setUsername(username);
    }
  }, []);

  const login = (newUsername) => {
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
    router.push("/games");
  };

  const logout = () => {
    localStorage.removeItem("username");
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
