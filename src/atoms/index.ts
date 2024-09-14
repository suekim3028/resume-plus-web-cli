import { interviewApis, userApis } from "@apis";
import { TokenStorage } from "@storage";
import { InterviewTypes, UserTypes } from "@types";
import { useAtom, useAtomValue } from "jotai";
import { atomWithRefresh, loadable } from "jotai/utils";
import { useCallback, useMemo } from "react";

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
  return { done: done.data, pending: pending.data };
});

const companyAtom = atomWithRefresh<
  Promise<{
    companies: InterviewTypes.Company[];
    departmentGroups: InterviewTypes.DepartmentGroup[];
  }>
>(async () => {
  const [companies, departmentGroups] = await Promise.all([
    interviewApis.getCompanies(),
    interviewApis.getDepartmentGroups(),
  ]);

  if (companies.isError || departmentGroups.isError) {
    return {
      companies: [],
      departmentGroups: [],
    };
  }

  return {
    companies: companies.data,
    departmentGroups: departmentGroups.data,
  };
});

export const useUser = () => {
  const [user, refreshUser] = useAtom(userAtom);
  const isGuestUser = useMemo(
    () => !!user && user.loginType === "GUEST",
    [user?.loginType]
  );

  return {
    user,
    refreshUser,
    isGuestUser,
    // setUser,
  };
};

export const useLoadableUser = () => {
  const [value] = useAtom(loadable(userAtom));

  return value;
};

export const useResult = () => {
  const result = useAtomValue(resultAtom);
  return result;
};

export const useCompanyData = () => {
  const companyData = useAtomValue(companyAtom);

  const getJobsByDepartmentId = useCallback(
    (id: number) =>
      companyData.departmentGroups.find(
        ({ departmentId }) => departmentId === id
      )?.job || [],
    [!!companyData]
  );

  return {
    ...companyData,
    getJobsByDepartmentId,
  };
};
