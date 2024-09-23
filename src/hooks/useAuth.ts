"use client";
import { userApis } from "@apis";
import { useSetUser, useUserValue } from "@atoms";

import { useGoogleLogin } from "@react-oauth/google";
import { TokenStorage } from "@storage";
import { useRouter } from "next/navigation";

import { useCallback } from "react";

export const useAuth = () => {
  const { user: currentUser, isGuestUser } = useUserValue();
  const setUser = useSetUser();
  const router = useRouter();

  const handleUser = useCallback((value: userApis.UserResponse) => {
    TokenStorage.set(value.token);
    setUser(value.user);
  }, []);

  const logout = useCallback(() => {
    router.replace("/");
    TokenStorage.remove();
    setUser(null);
  }, []);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { token_type, access_token } = tokenResponse;

        const method =
          !!currentUser && currentUser.loginType === "GUEST"
            ? userApis.guestGoogleSignIn
            : userApis.googleSignIn;

        const { data, isError } = await method({
          tokenType: token_type,
          accessToken: access_token,
        });

        if (!isError) handleUser(data);
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
