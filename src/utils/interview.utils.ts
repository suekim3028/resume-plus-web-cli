import { InterviewTypes } from "@types";

export const formatDate = (_date: string) => {
  console.log(_date);

  const dateString = _date.endsWith("Z") ? _date : _date + "Z";
  const date = new Date(dateString);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()} (${
    ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
  }) ${date.getHours()}:${date.getMinutes()}`;
};

export const findCompanyFromListById = (
  companies: InterviewTypes.Company[],
  companyId: number
) => {
  return companies.find(({ companyId: id }) => id === companyId);
};

export const findDepartmentFromListById = (
  departments: InterviewTypes.Department[],
  departmentId: number
) => {
  return departments.find(({ departmentId: id }) => id === departmentId);
};

export const findJobFromListById = (
  jobs: InterviewTypes.Job[],
  jobId: number
) => {
  return jobs.find(({ companyJobId: id }) => id === jobId);
};
