"use client";

import { useUser } from "@atoms";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const AuthWrapper = ({
  children,
  guestOnly,
}: {
  children: ReactNode;
  guestOnly: boolean;
}) => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user.loginType === "GUEST" && !guestOnly) {
      router.replace("/sign-in");
    }
    if (user.loginType !== "GUEST" && guestOnly) {
      router.replace("/");
    }
  }, [user.loginType, guestOnly]);

  return children;
};

export const UserOnlyWrapper = ({ children }: { children: ReactNode }) => (
  <AuthWrapper guestOnly={false}>{children}</AuthWrapper>
);

export const GuestOnlyWrapper = ({ children }: { children: ReactNode }) => (
  <AuthWrapper guestOnly={true}>{children}</AuthWrapper>
);
