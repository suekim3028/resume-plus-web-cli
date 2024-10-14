import { UserTypes } from "@types";

export type MyQueryData = {
  USER: { user: UserTypes.User; isGuest: boolean } | null;
};

export type MyQueryKey = keyof MyQueryData;
