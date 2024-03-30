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

const interviewQuestionsStore = selector({
  key: "interviewQuestions",
  get: async ({ get }) => {
    const interviewInfo = get(interviewInfoStore);
    if (!interviewInfo) return null;

    const { techQ, behavQ } = await interviewApis.getCommonQ();
    const { perQ } = await interviewApis.getPersonalQ();
    console.log("===========");

    return { techQ, behavQ, perQ };
  },
});

export const questionAllLoadedStore = selector({
  key: "questionAllLoaded",
  get: ({ get }) => {
    const questions = get(interviewQuestionsStore);
    console.log({ questionAllLoadedStore: !!questions });
    return !!questions;
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
