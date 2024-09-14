import { INTERVIEW_CONSTS } from "@constants";

export type Step = (typeof INTERVIEW_CONSTS.STEPS)[number];

export type Company = {
  companyId: number;
  companyName: string;
  thumbnailUrl?: string;
};
export type Department = {
  departmentId: number;
  department: string;
};

export type Job = {
  companyJobId: number;
  companyJob: string;
};
export type DepartmentGroup = Department & {
  job: Job[];
};

export type InterviewInfo = {
  company: string;
  department: string;
  job: string;
  interviewId: number;
  companyThumbnailUrl: string | null;
};

export type QuestionType = "tech" | "behavior" | "personal" | "introduce";

export type Feedback = {
  question: string;
  questionId: number;
  userAnswer: string;
  gptEvaluation: { criteria?: string; score: number; rationale: string }[];
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
  companyId?: number;
  companyName?: string;
  jobId: number;
  departmentId: number;
  createdAt: string;
  interviewId: number;
  introduceFeedback: Feedback[];
  personalFeedback: Feedback[];
  techFeedback: Feedback[];
  behaviorFeedback: Feedback[];
};

export type PendingInterviewResult = {
  companyId?: number;
  companyName?: string;
  jobId: number;
  departmentId: number;
  interviewId: number;
  createdAt: string;
};
