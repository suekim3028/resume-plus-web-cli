import { INTERVIEW_CONSTS } from "@constants";

export type Step = (typeof INTERVIEW_CONSTS.STEPS)[number];

export type Company = {
  companyId: number;
  companyName: string;
  // thumbnailUrl: string;
};

export type JobDepartment = {
  companyDeptId: number;
  companyDept: string;
};

export type Job = {
  companyJobId: number;
  companyJob: string;
};

export type InterviewInfo = {
  company: Company;
  department: JobDepartment;
  job: Job;
  interviewId: number;
};

export type QuestionType = "tech" | "behavior" | "personal" | "introduce";

// {[criteria]: [score, rationale]}
export type CriteriaEvaluation = Record<string, [string, string]>;

export type ScoreEvaluation = {
  score: number;
  rationale: string;
};

export type Evaluation = ScoreEvaluation | CriteriaEvaluation;

export type Feedback = {
  question: string;
  questionId: number;
  user_answer: string;
  evaluation: Evaluation;
};

export type Question = {
  question: string;
  questionId: number;
};

export type Chat = {
  isMine: boolean;
  content: string;
};

export type CompletedInterviewResult = {
  companyId: number;
  jobId: number;
  departmentId: number;
  createdAt: string;
  interviewId: number;
  introduce: Feedback[];
  personal: Feedback[];
  tech: Feedback[];
  behavior: Feedback[];
};

export type PendingInterviewResult = {
  companyId: number;
  jobId: number;
  departmentId: number;
  interviewId: number;
  createdAt: string;
};
