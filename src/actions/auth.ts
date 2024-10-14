"use server";

import { cookies } from "next/headers";

import { userApis } from "@apis";

export const handleLogin = async (
  value: Pick<userApis.UserResponse, "token">
) => {
  console.log("===HANDLE LOGIN");
  const { token } = value;

  const encrypted = JSON.stringify(token); // TODO: Encrypt
  cookies().set("token", encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
  // Redirect or handle the response after setting the cookie
};

const getToken = () => {
  const token = cookies().get("token")?.value;

  console.log({ token });
  return token ? JSON.parse(token) : null;
};

export const tokenLogin = async (): Promise<userApis.UserResponse | null> => {
  const token = getToken();
  if (!token) return null;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/users/current-user`,
    { headers: { Authorization: `Bearer ${token.accessToken}` } }
  );

  if (data.ok) {
    return await data.json();
  }

  return null;
};
