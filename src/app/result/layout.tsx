import { AuthWrapper, TopBarContainer } from "@components";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthWrapper guestOnly={false}>
      <TopBarContainer footer>{children}</TopBarContainer>
    </AuthWrapper>
  );
}
