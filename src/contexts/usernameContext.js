import React, { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUsername } from "@/store/user";

const UsernameContext = createContext();

function UsernameProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let username = localStorage.getItem("username");

      dispatch(setUsername(username));
    }
  }, []);

  const login = (newUsername) => {
    localStorage.setItem("username", newUsername);
    dispatch(setUsername(newUsername));
    router.push("/games");
  };

  const logout = () => {
    localStorage.removeItem("username");
    dispatch(setUsername(""));
    router.push("/username");
  };

  const value = { login, logout };
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
