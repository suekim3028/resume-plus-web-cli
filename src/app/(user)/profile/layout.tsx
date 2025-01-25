import { TopBarContainer } from "@components";
import { ReactNode } from "react";

  const Layout = ({ children }: { children: ReactNode }) => {
    return <TopBarContainer footer>{children}</TopBarContainer>;
  };

  export default Layout;
