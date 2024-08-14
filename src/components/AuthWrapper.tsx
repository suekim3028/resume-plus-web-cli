"use client";

import { useUser } from "@atoms";
import { useRouter } from "next/navigation";
import { memo, ReactNode, useEffect } from "react";

const AuthWrapper = ({
  children,
  guestOnly,
}: {
  children: ReactNode;
  guestOnly: boolean;
}) => {
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

export const UserOnlyWrapper = memo(({ children }: { children: ReactNode }) => (
  <AuthWrapper guestOnly={false}>{children}</AuthWrapper>
));

export const GuestOnlyWrapper = memo(
  ({ children }: { children: ReactNode }) => (
    <AuthWrapper guestOnly={true}>{children}</AuthWrapper>
  )
);
