import { InterviewTypes } from "@types";

export const STEPS = [
  "UPLOAD_CV",
  "QUESTION_LOADING",
  "QUESTION_READY",
  "ENV_CHECK",
  "INTERVIEW_LOADING",
  "INTERVIEW_MAIN",
  "EVALUATION_LOADING",
  "EVALUATION",
] as const;

export const ENV_CHECK_SECONDS = 5;

export const PART_LABEL: Record<InterviewTypes.QuestionType, string> = {
  introduce: "자기소개 및 지원동기",
  behavior: "조직 적합도 검증",
  personal: "경력사항 검증",
  tech: "직무능력 검증",
};

export const QUESTION_DURATION_IN_MINUTES_BY_TYPE: Record<
  InterviewTypes.QuestionType,
  number
> = {
  introduce: 2,
  behavior: 2,
  personal: 2,
  tech: 2,
};
