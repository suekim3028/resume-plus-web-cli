import { InterviewTypes } from "@types";
import { atom } from "recoil";

export const userStore = atom<null | { username: string }>({
  key: "user",
  default: null,
});

export const langStore = atom<InterviewTypes.Lang>({
  key: "lang",
  default: "ENG",
});

export const positionStore = atom<InterviewTypes.Position | null>({
  key: "position",
  default: null,
});

export const feedbackStore = atom<Record<
  number,
  InterviewTypes.Feedback
> | null>({ default: null, key: "feedback" });
