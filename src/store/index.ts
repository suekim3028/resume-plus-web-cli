import { InterviewTypes } from "@types";
import { atom } from "recoil";

export const userStore = atom<null | { username: string }>({
  key: "user",
  default: null,
});

export const interviewInfoStore = atom<null | InterviewTypes.InterviewInfo>({
  key: "interviewInfo",
  default: null,
});

export const interviewQuestionsStore = atom<
  Record<InterviewTypes.QuestionType, InterviewTypes.Question[]>
>({
  key: "interviewQuestions",
  default: {
    perQ: [],
    techQ: [],
    behavQ: [],
  },
});

export const evaluationStore = atom<
  Record<InterviewTypes.QuestionType, InterviewTypes.ScoreEvaluation[]>
>({
  key: "evaluation",
  default: {
    perQ: [],
    techQ: [],
    behavQ: [],
  },
});
