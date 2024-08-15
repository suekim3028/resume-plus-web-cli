import { GuestOrNonUserOnlyProvider } from "@contexts";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <GuestOrNonUserOnlyProvider>{children}</GuestOrNonUserOnlyProvider>;
}
