import { userApis } from "@apis";
import { TokenStorage } from "@storage";
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
    const token = TokenStorage.get();
    const hasToken = !!token && !!token.accessToken && !!token.refreshToken;
    if (!hasToken) {
      console.log("[USER STORE] no token.");
      return null;
    }
    get(userStoreRefresher);
    const { data, isError } = await userApis.tokenLogin();

    if (isError) {
      return null;
    }

    console.log(`[LOGIN] logged in with user id ${data.userId}`);

    return data;
  },
  set: ({ set }, newVal) => {
    set(userStore, newVal);
  },
});

export const authRouteStore = atom<string | null>({
  key: "authRouteStore",
  default: null,
});
