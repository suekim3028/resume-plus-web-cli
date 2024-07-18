import { INTERVIEW_CONSTS } from "@constants";

export type Step = (typeof INTERVIEW_CONSTS.STEPS)[number];

export type Company = {
  id: number;
  name: string;
  // thumbnailUrl: string;
};

export type JobDepartment = {
  id: number;
  department: string;
};

export type Job = {
  id: number;
  job: string;
};

export type InterviewInfo = {
  company: Company;
  department: JobDepartment;
  job: Job;
};

export type QuestionType = "tech" | "behavior" | "personal" | "introduce";

export type CriteriaEvaluation = Record<string, [string, string]>;

export type ScoreEvaluation = {
  score: number;
  rationale: string;
};

export type Evaluation = ScoreEvaluation | CriteriaEvaluation;

export type Feedback = {
  // type: QuestionType;
  question: string;
  questionId: number;
  user_answer: string;
  evaluation?: Evaluation;
};

export type Question = {
  question: string;
  id: number;
};

export type Chat = {
  isMine: boolean;
  content: string;
};
