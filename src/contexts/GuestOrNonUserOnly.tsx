import { useUser } from "@atoms";
import { AuthLoadingComponent } from "@components";

import { UserTypes } from "@types";
import { userUtils } from "@utils";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
} from "react";

const GuestOrNonUserOnly = createContext<GuestOrNonUserOnlyValue | null>(null);

const _GuestOrNonUserOnlyProvider = ({ children }: { children: ReactNode }) => {
  const { user, ...useUserValue } = useUser();
  const router = useRouter();

  const isGuest = !user || userUtils.isGuestUser(user);

  useEffect(() => {
    if (!isGuest) {
      router.replace("/");
    }
  }, [isGuest]);

  if (!isGuest) return <AuthLoadingComponent />;

  return (
    <GuestOrNonUserOnly.Provider
      value={{
        user: user,
        ...useUserValue,
      }}
    >
      {children}
    </GuestOrNonUserOnly.Provider>
  );
};

const GuestOrNonUserOnlyProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<AuthLoadingComponent />}>
      <_GuestOrNonUserOnlyProvider>{children}</_GuestOrNonUserOnlyProvider>
    </Suspense>
  );
};

type GuestOrNonUserOnlyValue = Omit<ReturnType<typeof useUser>, "user"> & {
  user: UserTypes.GuestUser | null;
};

export const useGuestOrNonUserOnly = () => {
  const ctx = useContext(GuestOrNonUserOnly);

  if (ctx === null) throw new Error();
  return ctx;
};
export default GuestOrNonUserOnlyProvider;
