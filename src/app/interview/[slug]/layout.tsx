import { UserOrGuestOnlyContextProvider } from "@contexts";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <UserOrGuestOnlyContextProvider>{children}</UserOrGuestOnlyContextProvider>
  );
}
