import { API, userApis } from "@apis";
import { userStore } from "@store";
import { UserTypes } from "@types";
import { withErrorHandling } from "@utils";
import { useRecoilState } from "recoil";

export const useUser = () => {
  const [user, setUser] = useRecoilState(userStore);

  const signIn = async (user: UserTypes.SignInUser) => {
    const { isError, data } = await withErrorHandling(() =>
      userApis.signIn(user)
    );
    if (isError) return;
    handleResponse(data);
  };

  const signUp = async (user: UserTypes.SignUpUser) => {
    const { isError, data } = await withErrorHandling(() =>
      userApis.signUp(user)
    );
    if (isError) return;
    handleResponse(data);
  };

  const handleResponse = (response: userApis.SignInResponse) => {
    const {
      user: userData,
      token: { accessToken },
    } = response;

    setUser(userData);
    API.setHeaderToken(accessToken);
  };

  const hasUser = !!user;

  return { signIn, signUp, hasUser };
};
