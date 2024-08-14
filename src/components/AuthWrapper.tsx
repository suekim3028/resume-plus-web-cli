"use client";

import { useUser } from "@atoms";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

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
export default React.memo(AuthWrapper);
