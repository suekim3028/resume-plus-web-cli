import { interviewApis, userApis } from "@apis";
import { TokenStorage } from "@storage";
import { InterviewTypes, UserTypes } from "@types";
import { jsUtils } from "@web-core";
import { useAtom, useAtomValue } from "jotai";
import { atomWithRefresh } from "jotai/utils";

const userAtom = atomWithRefresh<Promise<UserTypes.User>>(async () => {
  await jsUtils.wait(3);
  // if (1 == 1) return null;
  const token = TokenStorage.get();
  const hasToken = !!token && !!token.accessToken && !!token.refreshToken;
  if (!hasToken) console.log("[USER STORE] no token.");

  const { data, isError } = hasToken
    ? await userApis.tokenLogin()
    : await userApis.guestLogin();

  if (isError) throw new Error();
  console.log(
    `[LOGIN] logged in ${hasToken ? `with user id ${data.userId}` : "as GUEST"}`
  );

  return data;
});

export const useUser = () => {
  const [user, refreshUser] = useAtom(userAtom);
  return { user, refreshUser, isGuest: user.loginType === "GUEST" };
};

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

export const useResult = () => {
  const result = useAtomValue(resultAtom);
  return result;
};

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

export const useCompanyData = () => {
  const companyData = useAtomValue(companyAtom);
  return companyData;
};
