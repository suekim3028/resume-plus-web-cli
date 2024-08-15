import { UserTypes } from "@types";

export const isGuestUser = (
  user: UserTypes.User
): user is UserTypes.GuestUser => {
  return user.loginType === "GUEST";
};
