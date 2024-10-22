import { INTERVIEW_CONSTS } from "@constants";

export type Step = (typeof INTERVIEW_CONSTS.STEPS)[number];

export type Company = {
  companyId: number;
  companyName: string;
  imageUrl?: string;
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

export type QuestionType = "tech" | "behavior" | "personal" | "introduce";

export type InterviewProcessStat = {
  durationInMinutes: number;
  numberOfQuestions: number;
  statsByType: Record<
    QuestionType,
    {
      durationInMinutes: number;
      numberOfQuestions: number;
    }
  >;
};
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

export type QuestionWithType = {
  type: QuestionType;
} & Question;

type InterviewCompany =
  | {
      companyId: number;
      companyName?: undefined;
    }
  | {
      companyId?: undefined;
      companyName: string;
    };

export type InterviewSimpleSetting = {
  interviewId: number;
  jobId: number;
  departmentId: number;
  createdAt: string;
} & InterviewCompany;

export type InterviewDetailSetting = {
  interviewId: number;
  company: Company | string;
  department: Department;
  job: Job;
  interviewerName: string;
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
