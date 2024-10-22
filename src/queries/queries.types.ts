import { InterviewTypes, UserTypes } from "@types";

type QueryInfoFactory<Data, Dependency = undefined> = {
  data: Data;
  deps: Dependency;
};

export type MyQueryInfo = {
  USER: QueryInfoFactory<{ user: UserTypes.User; isGuest: boolean } | null>;
  RESULT: QueryInfoFactory<
    {
      done: InterviewTypes.CompletedInterviewResult[];
      pending: InterviewTypes.PendingInterviewResult[];
    },
    { isGuest: boolean }
  >;
  COMPANY_DEPT: QueryInfoFactory<{
    companies: InterviewTypes.Company[];
    departments: InterviewTypes.Department[];
    jobsByDepartmentId: Record<number, InterviewTypes.Job[]>;
  }>;
};

export type MyQueryKeys = {
  USER: ["USER"];
  RESULT: ["RESULT"];
  COMPANY_DEPT: ["COMPANY_DEPT"];
};
export type MyQueryKeyNames = keyof MyQueryKeys;
