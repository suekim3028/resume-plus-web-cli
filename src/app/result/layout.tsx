import { Spinner } from "@chakra-ui/react";
import { TopBarContainer } from "@components";
import { UserOnlyContextProvider } from "@contexts";
import { Flex } from "@uis";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <TopBarContainer footer>
      <UserOnlyContextProvider>
        <Suspense
          fallback={
            <Flex w="100%" flex={1}>
              <Spinner />
            </Flex>
          }
        >
          {children}
        </Suspense>
      </UserOnlyContextProvider>
    </TopBarContainer>
  );
}
