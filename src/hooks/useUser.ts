import { userApis } from "@apis";
import { userStore } from "@store";
import { withErrorHandling } from "@utils";
import { useRecoilState } from "recoil";

export const useUser = () => {
  const [user, setUser] = useRecoilState(userStore);

  const login = async (username: string, password: string) => {
    const { isError } = await withErrorHandling(() =>
      userApis.signIn({
        username,
        password,
      })
    );
    if (isError) return;

    setUser({ username });
  };

  const hasUser = !!user;

  return { login, hasUser };
};
