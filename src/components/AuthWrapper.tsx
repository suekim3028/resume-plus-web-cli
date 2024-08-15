"use client";

import { useUser } from "@atoms";
import { Flex, Text } from "@uis";
import { useRouter } from "next/navigation";
import React, { ReactNode, Suspense, useEffect } from "react";

const _AuthWrapper = ({ children, guestOnly }: AuthWrapperProps) => {
  const router = useRouter();
  const { isGuest } = useUser();

  useEffect(() => {
    if (isGuest && !guestOnly) {
      router.replace("/sign-in");
    }
    if (!isGuest && guestOnly) {
      router.replace("/");
    }
  }, [isGuest, guestOnly]);

  return children;
};

const AuthWrapper = (props: AuthWrapperProps) => {
  return (
    <Suspense
      fallback={
        <Flex flex={1} h={200} alignItems={"center"}>
          <Text type={"Body2_Normal"}>유저 정보 확인중 ...</Text>
        </Flex>
      }
    >
      <_AuthWrapper {...props} />
    </Suspense>
  );
};

type AuthWrapperProps = {
  children: ReactNode;
  guestOnly: boolean;
};
export default React.memo(AuthWrapper);
