import { TopBarContainer } from "@components";
import { UserOnlyContextProvider } from "@contexts";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <TopBarContainer footer>
      <UserOnlyContextProvider>{children}</UserOnlyContextProvider>
    </TopBarContainer>
  );
}
