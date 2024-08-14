import { Spinner } from "@chakra-ui/react";
import { TopBarContainer } from "@components";
import { Flex } from "@uis";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <TopBarContainer>
      <Suspense
        fallback={
          <Flex w="100%">
            <Spinner />
          </Flex>
        }
      >
        {children}
      </Suspense>
    </TopBarContainer>
  );
}
