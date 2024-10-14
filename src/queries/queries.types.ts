import { InterviewTypes, UserTypes } from "@types";

export type QueryDataFactory<Data, Dependency = undefined> = {
  data: Data;
  deps: Dependency;
};

export type MyQueryData = {
  USER: QueryDataFactory<{ user: UserTypes.User; isGuest: boolean } | null>;
  RESULT: QueryDataFactory<
    {
      done: InterviewTypes.CompletedInterviewResult[];
      pending: InterviewTypes.PendingInterviewResult[];
    },
    { isGuest: boolean }
  >;
  COMPANY_DEPT: QueryDataFactory<{
    companies: InterviewTypes.Company[];
    departments: InterviewTypes.Department[];
    jobsByDepartmentId: Record<number, InterviewTypes.Job[]>;
  }>;
};

export type MyQueryKey = keyof MyQueryData;
