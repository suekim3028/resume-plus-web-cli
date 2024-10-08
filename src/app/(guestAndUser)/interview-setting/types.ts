import { InterviewTypes } from "@types";

export type InterviewSettingValue = {
  company: InterviewTypes.Company | string;
  department: InterviewTypes.Department;
  job: InterviewTypes.Job;
  privacyAgreed: boolean;
  isDefaultResume: boolean;
  resume: File;
};
