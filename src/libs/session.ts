import "server-only";

export const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  //   const session = await encrypt({ userId, expiresAt })

  //   cookies().set("session", session, {
  //     httpOnly: true,
  //     secure: true,
  //     expires: expiresAt,
  //     sameSite: "lax",
  //     path: "/",
  //   });
};
