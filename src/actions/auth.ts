"use server";

import { cookies } from "next/headers";

import { userApis } from "@apis";

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

export const getToken = async () => {
  const token = cookies().get("token")?.value;

  console.log("===HAVE TOKEN: ", !!token);

  return token ? JSON.parse(token) : null; // TODO: decrypt
};

export const tokenLogin = async (): Promise<
  (userApis.UserResponse & { isGuest: boolean }) | null
> => {
  const token = await getToken();
  if (!token) return null;

  const { isError, data } = await userApis.tokenLogin();

  console.log({ data, isError });
  if (isError) return null;

  return { user: data, token, isGuest: data?.loginType === "GUEST" };
};

export const handleSignOut = async () => {
  cookies().delete("token");
};
