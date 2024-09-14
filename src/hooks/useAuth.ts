"use client";
import { userApis } from "@apis";
import { useUser } from "@atoms";

import { useGoogleLogin } from "@react-oauth/google";
import { TokenStorage } from "@storage";
import { useCallback } from "react";

export const useAuth = () => {
  const { refreshUser, user: currentUser, isGuestUser } = useUser();

  const handleUser = useCallback(({ token }: userApis.UserResponse) => {
    TokenStorage.set(token);
    refreshUser();
  }, []);

  const logout = useCallback(() => {
    TokenStorage.remove();
    refreshUser();
  }, []);

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

        const method =
          !!currentUser && currentUser.loginType === "GUEST"
            ? userApis.guestGoogleSignIn
            : userApis.googleSignIn;

        if (!!email && !!name) {
          const { data, isError } = await method({
            email,
            name,
            idToken: access_token,
          });

          if (!isError) handleUser(data);
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

  const loginWithEmail = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const { data, isError } = await userApis.emailSignIn({
        email,
        password,
      });

      if (isError) {
        return { success: false };
      }
      handleUser(data);
      return { success: true };
    },
    [handleUser, isGuestUser]
  );

  const signUpWithEmail = useCallback(
    async (params: { email: string; password: string; name: string }) => {
      const method = isGuestUser ? userApis.guestSignUp : userApis.signUp;

      const { data, isError } = await method(params);

      if (isError) {
        return { success: false };
      }
      handleUser(data);
      return { success: true };
    },
    [handleUser, isGuestUser]
  );

  const guestSignIn = useCallback(async () => {
    // const { setUser } = useUser();
    const { data, isError } = await userApis.guestLogin();

    if (isError) {
      return { success: false };
    }
    handleUser(data);
    console.log(`[LOGIN] logged in as GUEST"}`);
    return { success: true };
  }, [handleUser]);

  return {
    loginWithGoogle,
    loginWithEmail,
    signUpWithEmail,
    logout,
    guestSignIn,
  };
};
