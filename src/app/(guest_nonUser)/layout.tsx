"use client";
import { AuthLayout } from "@components";
import { useRouter } from "next/navigation";

import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <AuthLayout
      validate={(user) => !user || user.loginType === "GUEST"}
      onInvalidState={() => {
        router.replace("/");
      }}
    >
      {children}
    </AuthLayout>
  );
};

export default Layout;
