import { useUser } from "@atoms";
import { AuthLoadingComponent } from "@components";

import { UserTypes } from "@types";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
} from "react";

const UserOnlyContext = createContext<UserOnlyContextValue | null>(null);

const _UserOnlyContextProvider = ({ children }: { children: ReactNode }) => {
  const { user, ...useUserValue } = useUser();
  const router = useRouter();

  const isUser = !!user && user.loginType !== "GUEST";

  useEffect(() => {
    if (!isUser) {
      router.replace("/");
    }
  }, [isUser]);

  if (!isUser) return <AuthLoadingComponent />;
  return (
    <UserOnlyContext.Provider value={{ user, ...useUserValue }}>
      {children}
    </UserOnlyContext.Provider>
  );
};

const UserOnlyContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<AuthLoadingComponent />}>
      <_UserOnlyContextProvider>{children}</_UserOnlyContextProvider>
    </Suspense>
  );
};

type UserOnlyContextValue = Omit<ReturnType<typeof useUser>, "user"> & {
  user: Exclude<UserTypes.User, { loginType: "GUEST" }>;
};

export const useUserOnlyContext = () => {
  const ctx = useContext(UserOnlyContext);

  if (ctx === null) throw new Error();
  return ctx;
};
export default UserOnlyContextProvider;
