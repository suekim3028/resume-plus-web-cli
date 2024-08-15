import { useUser } from "@atoms";
import { AuthLoadingComponent } from "@components";

import { useAuth } from "@hooks";
import { UserTypes } from "@types";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
} from "react";

const UserOrGuestOnlyContext =
  createContext<UserOrGuestOnlyContextValue | null>(null);

const _UserOrGuestOnlyContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user, ...useUserValue } = useUser();
  const { guestSignIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // guest 정보라도 꼭 있어야하는 상황에서 쓰이는 context이므로
      // token 없는 경우 guest login
      // 실패시 alert 후 홈으로
      (async () => {
        const { isError } = await guestSignIn();
        if (isError) {
          alert("오류가 발생했습니다. 다시 한번 시도해 주세요.");
          router.replace("/");
        }
      })();
    }
  }, [!!user]);

  if (!user) return <AuthLoadingComponent />;
  return (
    <UserOrGuestOnlyContext.Provider value={{ user, ...useUserValue }}>
      {children}
    </UserOrGuestOnlyContext.Provider>
  );
};

const UserOrGuestOnlyContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <Suspense fallback={<AuthLoadingComponent />}>
      <_UserOrGuestOnlyContextProvider>
        {children}
      </_UserOrGuestOnlyContextProvider>
    </Suspense>
  );
};

type UserOrGuestOnlyContextValue = Omit<ReturnType<typeof useUser>, "user"> & {
  user: UserTypes.User;
};

export const useUserOrGuestOnlyContext = () => {
  const ctx = useContext(UserOrGuestOnlyContext);

  if (ctx === null) throw new Error();
  return ctx;
};
export default UserOrGuestOnlyContextProvider;
