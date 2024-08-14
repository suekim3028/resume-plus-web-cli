"use client";

import { useUser } from "@atoms";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user.loginType === "GUEST") {
      router.replace("/sign-in");
    }
  }, [user.loginType]);

  if (!user) return <></>;

  return children;
};

export default AuthWrapper;
