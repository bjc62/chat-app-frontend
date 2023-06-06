import React, { FC, useState } from "react";
import User from "../types/User";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserContextProps>({
  user: { email: "" },
  setUser: () => {},
});

export const UserProvider: FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
