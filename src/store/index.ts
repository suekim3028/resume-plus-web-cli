import { interviewApis } from "@apis";
import { InterviewTypes, UserTypes } from "@types";
import { atom, selector } from "recoil";

export const userStore = atom<null | Omit<UserTypes.User, "password">>({
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

export const evaluationStore = atom<InterviewTypes.Feedback[]>({
  key: "evaluation",
  default: [],
});

export const evaluationFinished = selector({
  key: "evaluationFinishedStore",
  get: ({ get }) => {
    const questions = get(interviewQuestionsStore);
    const evaluation = get(evaluationStore);

    if (!questions) return false;

    return [...questions.behavQ, ...questions.perQ, ...questions.techQ].every(
      ({ id }) => !!evaluation.find(({ questionId }) => id === questionId)
    );
  },
});
