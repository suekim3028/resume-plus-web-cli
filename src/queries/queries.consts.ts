import { authActions } from "@actions";
import { interviewApis } from "@apis";
import { QueryOptions } from "@tanstack/react-query";
import { InterviewTypes, UserTypes } from "@types";

type QueryOptionsWithKey<T extends unknown> = QueryOptions<T> &
  Required<Pick<QueryOptions<T>, "queryKey">>;

export const userQueryOptions: QueryOptionsWithKey<{
  user: UserTypes.User;
  isGuest: boolean;
  result: {
    done: InterviewTypes.CompletedInterviewResult[];
    pending: InterviewTypes.PendingInterviewResult[];
  };
} | null> = {
  queryKey: ["USER"],
  queryFn: async () => {
    const userRes = await authActions.tokenLogin();
    if (!userRes) {
      return null;
    }

    const [done, pending] = await Promise.all([
      interviewApis.getCompletedInterviewResultList(),
      interviewApis.getPendingResultList(),
    ]);

    if (done.isError || pending.isError)
      return {
        ...userRes,
        result: { done: [], pending: [] },
      };

    return {
      ...userRes,
      result: { done: done.data, pending: pending.data },
    };
  },
};

export const companyDeptOptions: QueryOptionsWithKey<{
  companies: InterviewTypes.Company[];
  departments: InterviewTypes.DepartmentGroup[];
  jobsByDepartmentId: Record<number, InterviewTypes.Job[]>;
}> = {
  queryKey: ["COMPANY"],
  queryFn: async () => {
    const [companies, departmentGroups] = await Promise.all([
      interviewApis.getCompanies(),
      interviewApis.getDepartmentGroups(),
    ]);

    if (companies.isError || departmentGroups.isError) {
      return {
        companies: [],
        departments: [],
        jobsByDepartmentId: {},
      };
    }

    return {
      companies: companies.data,
      departments: departmentGroups.data,
      jobsByDepartmentId: departmentGroups.data.reduce((prev, next) => {
        return { ...prev, [next.departmentId]: next.job };
      }, {}),
    };
  },
};
