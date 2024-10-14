"use server";

import { cookies } from "next/headers";

import { userApis } from "@apis";
import { UserTypes } from "@types";

export const handleSignIn = async (
  value: Pick<userApis.UserResponse, "token">
) => {
  const { token } = value;

  const encrypted = JSON.stringify(token); // TODO: Encrypt
  cookies().set("token", encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
};

const getToken = () => {
  const token = cookies().get("token")?.value;

  return token ? JSON.parse(token) : null; // TODO: decrypt
};

export const tokenLogin = async (): Promise<
  (userApis.UserResponse & { isGuest: boolean }) | null
> => {
  const token = getToken();
  if (!token) return null;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/users/current-user`,
    { headers: { Authorization: `Bearer ${token.accessToken}` } }
  );

  if (data.ok) {
    const user = (await data.json()) as UserTypes.User;

    return { user, token, isGuest: user?.loginType === "GUEST" };
  }

  return null;
};

export const handleSignOut = async () => {
  cookies().delete("token");
};
