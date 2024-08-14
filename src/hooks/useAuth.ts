"use client";
import { userApis } from "@apis";
import { useUser } from "@atoms";

import { useGoogleLogin } from "@react-oauth/google";
import { TokenStorage } from "@storage";

export const useAuth = () => {
  const { refreshUser, isGuest } = useUser();

  const handleUser = ({ user, token }: userApis.UserResponse) => {
    TokenStorage.set(token);
    refreshUser();
  };

  const logout = () => {
    TokenStorage.remove();
    refreshUser();
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { token_type, access_token } = tokenResponse;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `${token_type} ${access_token}`);

        const data = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          }
        );
        const user = await data.json();
        const email = user?.email;
        const name = user?.name;

        const method = isGuest
          ? userApis.guestGoogleSignIn
          : userApis.googleSignIn;

        if (!!email && !!name) {
          const { data, isError } = await method({
            email,
            name,
            id_token: access_token,
          });

          if (isError) {
            throw new Error();
          }

          handleUser(data);
        } else {
          throw new Error();
        }
      } catch (e) {
        alert("로그인에서 오류가 발생했어요. 다시 시도해주세요.");
      }
    },
    onError: () => {
      alert("로그인에서 오류가 발생했어요. 다시 시도해주세요.");
    },
  });

  const loginWithEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data, isError } = await userApis.emailSignIn({
      email,
      password,
    });

    if (isError) {
      throw new Error();
    }

    handleUser(data);
  };

  const signUpWithEmail = async (params: {
    email: string;
    password: string;
    name: string;
  }) => {
    const method = isGuest ? userApis.guestSignUp : userApis.signUp;

    const { data, isError } = await method(params);

    if (isError) {
      throw new Error();
    }

    handleUser(data);
  };

  return {
    loginWithGoogle,
    loginWithEmail,
    signUpWithEmail,
    logout,
  };
};
