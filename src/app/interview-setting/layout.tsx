import { Spinner } from "@chakra-ui/react";
import { TopBarContainer } from "@components";
import { UserOrGuestOnlyContextProvider } from "@contexts";
import { Flex } from "@uis";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <TopBarContainer>
      <UserOrGuestOnlyContextProvider>
        <Suspense
          fallback={
            <Flex w="100%">
              <Spinner />
            </Flex>
          }
        >
          {children}
        </Suspense>
      </UserOrGuestOnlyContextProvider>
    </TopBarContainer>
  );
}
