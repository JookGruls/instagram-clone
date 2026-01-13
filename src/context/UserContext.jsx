import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Mock user data - in a real app, this would come from an API/Auth service
  const [user] = useState({
    username: "mike_sattra",
    fullName: "Mikey",
    avatar: "/images/fat_cat.jpg",
  });

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
