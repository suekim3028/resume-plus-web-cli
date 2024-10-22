"use server";

import { cookies } from "next/headers";

import { userApis } from "@apis";
import { UserTypes } from "@types";

export const handleSignIn = async (value: userApis.UserResponse) => {
  const {
    token,
    user: { loginType },
  } = value;

  const encrypted = JSON.stringify({ token, loginType }); // TODO: Encrypt
  cookies().set("token", encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
};

export const getCurrentUser = async (): Promise<{
  token: UserTypes.Token;
  loginType: UserTypes.LoginType;
} | null> => {
  const token = cookies().get("token")?.value;

  return token ? JSON.parse(token) : null; // TODO: decrypt
};

export const tokenLogin = async (): Promise<
  (userApis.UserResponse & { isGuest: boolean }) | null
> => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const { token } = currentUser;
  const { isError, data } = await userApis.tokenLogin();

  if (isError) return null;

  return { user: data, token, isGuest: data?.loginType === "GUEST" };
};

export const handleSignOut = async () => {
  cookies().delete("token");
};
