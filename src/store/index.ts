import { interviewApis, userApis } from "@apis";
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

export const completedResultStoreRefresher = atom<number>({
  key: "completedResultRefresher",
  default: 0,
});

export const completedResultStore = selector<
  InterviewTypes.CompletedInterviewResult[]
>({
  key: "completedResult",
  get: async ({ get }) => {
    get(completedResultStoreRefresher);
    const { data, isError } =
      await interviewApis.getCompletedInterviewResultList();

    if (isError) {
      return [];
    }

    return data.resultList;
  },
});

export const pendingResultStoreRefresher = atom<number>({
  key: "pendingResultRefresher",
  default: 0,
});

export const pendingResultStore = selector<
  InterviewTypes.PendingInterviewResult[]
>({
  key: "pendingResult",
  get: async ({ get }) => {
    get(pendingResultStoreRefresher);
    const { data, isError } = await interviewApis.getPendingResultList();

    if (isError) {
      return [];
    }

    return data.resultList;
  },
});

export const companyDataStore = selector<{
  companies: InterviewTypes.Company[];
  departments: InterviewTypes.JobDepartment[];
  jobs: InterviewTypes.Job[];
} | null>({
  key: "companyData",
  get: async ({ get }) => {
    get(completedResultStoreRefresher);
    const [
      { data: companies, isError: companyError },
      { data: departments, isError: depError },
      { data: jobs, isError: jobError },
    ] = await Promise.all([
      interviewApis.getCompanies(),
      interviewApis.getDepartments(),
      interviewApis.getJobs(),
    ]);

    if (companyError || depError || jobError) {
      return null;
    }

    return { companies, departments, jobs };
  },
});
