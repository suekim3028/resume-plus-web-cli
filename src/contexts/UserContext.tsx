import { userAtom } from "@atoms";
import { UserTypes } from "@types";
import { useAtom } from "jotai";
import { createContext, ReactNode, useContext } from "react";

const UserContext = createContext<null | UserContextValue>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, refreshUser] = useAtom(userAtom);

  return (
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

type UserContextValue = {
  user: UserTypes.User;
  refreshUser: () => void;
};

export const useUser = () => {
  const value = useContext(UserContext);
  if (!value) throw new Error();

  return value;
};

export default UserContextProvider;
