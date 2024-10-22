"use client";
import { authActions } from "@actions";
import { userApis } from "@apis";
import { queryOptions } from "@queries";
import { getQueryClient } from "@queries/queries.utils";

import { useGoogleLogin } from "@react-oauth/google";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useCallback } from "react";

export const useAuth = () => {
  const { data: userData } = useQuery(queryOptions.userQueryOptions);

  const router = useRouter();

  const handleUser = useCallback(async (value: userApis.UserResponse) => {
    await authActions.handleSignIn(value);
    getQueryClient().invalidateQueries(queryOptions.userQueryOptions);
  }, []);

  const signOut = useCallback(async () => {
    router.replace("/");
    await authActions.handleSignOut();
    getQueryClient().invalidateQueries(queryOptions.userQueryOptions);
  }, []);

  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { token_type, access_token } = tokenResponse;

        const method =
          !!userData && userData.user.loginType === "GUEST"
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

  const signInWithEmail = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const method =
        !!userData && userData.user.loginType === "GUEST"
          ? userApis.guestEmailSignIn
          : userApis.emailSignIn;

      const { data, isError } = await method({
        email,
        password,
      });

      if (isError) {
        return { success: false };
      }
      handleUser(data);
      return { success: true };
    },
    [handleUser, userData]
  );

  const signUpWithEmail = useCallback(
    async (params: { email: string; password: string; name: string }) => {
      const method =
        !!userData && userData.user.loginType === "GUEST"
          ? userApis.guestSignUp
          : userApis.signUp;

      const { data, isError } = await method(params);

      if (isError) {
        return { success: false };
      }
      handleUser(data);
      return { success: true };
    },
    [handleUser, userData]
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
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    guestSignIn,
  };
};
