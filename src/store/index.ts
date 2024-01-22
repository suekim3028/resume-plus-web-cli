import { InterviewTypes } from "@types";
import { atom } from "recoil";

export const userStore = atom<null | { username: string }>({
  key: "user",
  default: null,
});

export const langStore = atom<InterviewTypes.Lang | null>({
  key: "lang",
  default: null,
});

export const positionStore = atom<InterviewTypes.Position | null>({
  key: "position",
  default: null,
});
