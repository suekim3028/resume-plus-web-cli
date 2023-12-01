import { InterviewTypes } from "@types";

export const FIXED_STEPS = ["INTRO", "UPLOAD_CV"] as const;
export const VARIANT_STEPS = ["COMMON_Q", "PERSONAL_Q", "FEEDBACK"] as const;

export const STEPS = [...FIXED_STEPS, ...VARIANT_STEPS] as const;

export const FIXED_CONVO: Record<
  InterviewTypes.FixedStep,
  { KOR: string; ENG: string }
> = {
  INTRO: {
    KOR: "Welcome to Interview Bot ! Please select your preferred language",
    ENG: "Welcome to Interview Bot ! Please select your preferred language",
  },
  UPLOAD_CV: {
    KOR: "관심 있는 직무를 선택하고, 자기소개서 또는 이력서를 업로드해주세요.",
    ENG: "Please Upload your CV/Resume and select the position you are interested in. ",
  },
};

export const FIXED_CONVO_OPTIONS: Record<InterviewTypes.FixedStep, string[]> = {
  INTRO: ["KOREAN", "ENGLISH"],
  UPLOAD_CV: ["AI/ML", "Frontend", "Backend", "Mobile"],
};

export const INTERVIEW_LANG_OPTIONS: Record<InterviewTypes.Lang, string> = {
  ENG: "English",
  KOR: "Korean",
};
