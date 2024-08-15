import { interviewApis, userApis } from "@apis";
import { TokenStorage } from "@storage";
import { InterviewTypes, UserTypes } from "@types";
import { useAtom, useAtomValue } from "jotai";
import { atomWithRefresh } from "jotai/utils";

const userAtom = atomWithRefresh<Promise<UserTypes.User | null>>(async () => {
  const token = TokenStorage.get();
  const hasToken = !!token && !!token.accessToken && !!token.refreshToken;
  if (!hasToken) console.log("[USER STORE] no token.");

  if (hasToken) {
    const { data, isError } = await userApis.tokenLogin();
    if (!isError) {
      console.log(`[LOGIN] logged in with user id ${data.userId}`);
      return data;
    }
  }
  return null;
});

const resultAtom = atomWithRefresh<
  Promise<{
    done: InterviewTypes.CompletedInterviewResult[];
    pending: InterviewTypes.PendingInterviewResult[];
  }>
>(async (get) => {
  get(userAtom);

  const [done, pending] = await Promise.all([
    interviewApis.getCompletedInterviewResultList(),
    interviewApis.getPendingResultList(),
  ]);

  if (done.isError || pending.isError)
    return {
      done: [],
      pending: [],
    };
  return { done: done.data.resultList, pending: pending.data.resultList };
});

const companyAtom = atomWithRefresh<
  Promise<{
    companies: InterviewTypes.Company[];
    departments: InterviewTypes.JobDepartment[];
    jobs: InterviewTypes.Job[];
  }>
>(async () => {
  const [companies, departments, jobs] = await Promise.all([
    interviewApis.getCompanies(),
    interviewApis.getDepartments(),
    interviewApis.getJobs(),
  ]);

  if (companies.isError || departments.isError || jobs.isError)
    throw new Error();
  return {
    companies: companies.data,
    departments: departments.data,
    jobs: jobs.data,
  };
});

export const useUser = () => {
  const [user, refreshUser] = useAtom(userAtom);
  const isGuestUser = !!user && user.loginType === "GUEST";
  console.log("user====", user);
  return {
    user,
    refreshUser,
    isGuestUser,
    // setUser,
  };
};

export const useResult = () => {
  const result = useAtomValue(resultAtom);
  return result;
};

export const useCompanyData = () => {
  const companyData = useAtomValue(companyAtom);
  return companyData;
};
