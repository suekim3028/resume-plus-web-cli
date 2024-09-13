"use client";
import { AuthLayout } from "@components";
import { useAuth } from "@hooks";
import { useRouter } from "next/navigation";

import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { guestSignIn } = useAuth();

  return (
    <AuthLayout validate={(user) => !!user} onInvalidState={guestSignIn}>
      {children}
    </AuthLayout>
  );
};

export default Layout;
