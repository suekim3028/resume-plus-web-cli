import { AuthWrapper, TopBarContainer } from "@components";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <TopBarContainer footer>
      <AuthWrapper guestOnly={false}>{children}</AuthWrapper>
    </TopBarContainer>
  );
}
