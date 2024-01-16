import { userApis } from "@apis";
import { userStore } from "@store";
import { UserType } from "@types";
import { withErrorHandling } from "@utils";
import { useRecoilState } from "recoil";

export const useUser = () => {
  const [user, setUser] = useRecoilState(userStore);

  const signIn = async (user: UserType.SignInUser) => {
    const { isError } = await withErrorHandling(() => userApis.signIn(user));
    if (isError) return;

    const { username } = user;
    setUser({ username });
  };

  const signUp = async (user: UserType.SignUpUser) => {
    const { isError } = await withErrorHandling(() => userApis.signUp(user));
    if (isError) return;

    const { username } = user;
    setUser({ username });
  };

  const hasUser = !!user;

  return { signIn, signUp, hasUser };
};
