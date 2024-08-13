"use client";
import { userAtom } from "@atoms";
import { UserContextProvider } from "@contexts";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { ReactNode, Suspense, useEffect } from "react";

const _AuthWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (!user) {
      router.replace("/sign-in");
    }
  }, [!!user]);

  if (!user) return <></>;

  return <UserContextProvider>{children}</UserContextProvider>;
};

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<>유저 가져오는중</>}>
      <_AuthWrapper>{children}</_AuthWrapper>
    </Suspense>
  );
};

export default AuthWrapper;
