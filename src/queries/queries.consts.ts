import { authActions } from "@actions";
import { interviewApis } from "@apis";
import { QueryOptions } from "@tanstack/react-query";
import { MyQueryData, MyQueryKey } from "./queries.types";

export const queryOptions: {
  [key in MyQueryKey]: (
    params: MyQueryData[key]["deps"]
  ) => Omit<QueryOptions<MyQueryData[key]["data"]>, "queryKey"> &
    Required<Pick<QueryOptions<MyQueryData[key]["data"]>, "queryKey">>;
} = {
  USER: () => ({
    queryKey: ["user"],
    queryFn: authActions.tokenLogin,
  }),

  RESULT: ({ isGuest }) => ({
    queryKey: ["result"],
    queryFn: async () => {
      if (isGuest) {
        return {
          done: [],
          pending: [],
        };
      }

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
    },
  }),

  COMPANY_DEPT: () => ({
    queryKey: ["result"],
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
  }),
};
