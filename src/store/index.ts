import { userApis } from "@apis";
import { InterviewTypes, UserTypes } from "@types";
import { atom, selector } from "recoil";

export const interviewInfoStore = atom<null | InterviewTypes.InterviewInfo>({
  key: "interviewInfo",
  default: null,
});

export const interviewQuestionsStore = selector({
  key: "interviewQuestions",
  get: async ({ get }) => {
    const interviewInfo = get(interviewInfoStore);
    if (!interviewInfo) return null;

    // const { techQ, behavQ } = await interviewApis.getCommonQ();
    // const { perQ } = await interviewApis.getPersonalQ();

    // return { techQ, behavQ, perQ };
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

    // return [...questions.behavQ, ...questions.perQ, ...questions.techQ].every(
    //   ({ id }) => !!evaluation.find(({ questionId }) => id === questionId)
    // );
  },
});

export const userStoreRefresher = atom<number>({
  key: "userRefresher",
  default: 0,
});

export const userStore = selector<UserTypes.User | null>({
  key: "user",
  get: async ({ get }) => {
    get(userStoreRefresher);
    const { data, isError } = await userApis.tokenLogin();
    console.log("[LOGIN] no user.");
    if (isError) return null;

    console.log(`[LOGIN] logged in with user id ${data.user.id}`);

    return data.user;
  },
  set: async ({ set }, newVal) => {
    set(userStore, newVal);
  },
});
