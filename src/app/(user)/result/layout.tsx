import { TopBarContainer } from "@components";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <TopBarContainer footer>{children}</TopBarContainer>;
}
