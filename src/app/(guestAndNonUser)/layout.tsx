"use client";
import { AuthLayout } from "@components";
import { UserTypes } from "@types";
import { useRouter } from "next/navigation";

import { ReactNode, useCallback } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const validate = useCallback(
    (loginType: UserTypes.LoginType | null) =>
      loginType === null || loginType === "GUEST",
    []
  );
  const handleInvalidState = useCallback(() => router.replace("/"), []);

  return (
    <AuthLayout validate={validate} onInvalidState={handleInvalidState}>
      {children}
    </AuthLayout>
  );
};

export default Layout;
