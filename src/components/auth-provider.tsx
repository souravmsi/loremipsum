"use client";

import React, { useState, useEffect } from "react";

type Role = "PHDCC" | "MINISTRY" | "COMPANY" | "STUDENT";

type User = {
  id: string;
  email: string;
  role: Role;
  name: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
};

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, updateUser] = useState<User>({
    email: "",
    role: "STUDENT",
    id: "",
    name: ""
  });


  useEffect(() => {
    // Ensure this only runs client-side
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error("Failed to parse user from localStorage:", err);
        }
      } else {
        setUser({
          email: "",
          role: "STUDENT",
          id: "",
          name: ""
        });
      }
    }
  }, []);

  const setUser = (newUser: User) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    updateUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
