"use client";
import { AuthLayout } from "@components";
import { useAuth } from "@hooks";
import { UserTypes } from "@types";
import { ReactNode, useCallback } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { guestSignIn } = useAuth();

  const validate = useCallback(
    (loginType: UserTypes.LoginType | null) => !!loginType,
    []
  );

  return (
    <AuthLayout validate={validate} onInvalidState={guestSignIn}>
      {children}
    </AuthLayout>
  );
}
