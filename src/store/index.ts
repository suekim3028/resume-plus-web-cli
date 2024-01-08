import { atom } from "recoil";

export const userStore = atom<null | { username: string }>({
  key: "user",
  default: null,
});
