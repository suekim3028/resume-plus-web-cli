import { interviewApis } from "@apis";
import { InterviewTypes } from "@types";
import { atom, selector } from "recoil";

export const userStore = atom<null | { username: string }>({
  key: "user",
  default: null,
});

export const interviewInfoStore = atom<null | InterviewTypes.InterviewInfo>({
  key: "interviewInfo",
  default: null,
});

export const interviewQuestionsStore = selector({
  key: "interviewQuestions",
  get: async ({ get }) => {
    const interviewInfo = get(interviewInfoStore);
    if (!interviewInfo) return null;

    const { techQ, behavQ } = await interviewApis.getCommonQ();
    const { perQ } = await interviewApis.getPersonalQ();

    return { techQ, behavQ, perQ };
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
