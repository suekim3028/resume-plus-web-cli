import { INTERVIEW_CONSTS } from "@constants";

export type FixedStep = (typeof INTERVIEW_CONSTS.FIXED_STEPS)[number];
export type VariantStep = (typeof INTERVIEW_CONSTS.VARIANT_STEPS)[number];
export type Step = (typeof INTERVIEW_CONSTS.STEPS)[number];

export type Lang = (typeof INTERVIEW_CONSTS.LANG_OPTIONS)[number];
export type Position = (typeof INTERVIEW_CONSTS.POSITION_OPTIONS)[number];

export type QuestionType = "behav_q" | "tech_q" | "personal_q";

export type Evaluation = {
  criteria?: string;
  score: number;
  rationale: string;
};

export type Feedback = {
  type: QuestionType;
  question: string;
  user_answer: string;
  evaluation?: Evaluation[];
};

export type Question = {
  type: QuestionType;
  question: string;
  id: number;
};
