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
  const foundCompany = companies.find(({ companyId: id }) => id === companyId);
  if (!foundCompany) throw new Error("company is not found by id");
  return foundCompany;
};

export const findDepartmentFromListById = (
  departments: InterviewTypes.Department[],
  departmentId: number
) => {
  const foundDept = departments.find(
    ({ departmentId: id }) => id === departmentId
  );
  if (!foundDept) throw new Error("department is not found by id");
  return foundDept;
};

export const findJobFromListById = (
  jobs: InterviewTypes.Job[],
  jobId: number
) => {
  const foundJob = jobs.find(({ companyJobId: id }) => id === jobId);
  if (!foundJob) throw new Error("job is not found by id");
  return foundJob;
};
