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

export const LANG_OPTIONS = ["ENG", "KOR"] as const;

export const LANG_OPTION_LABEL: Record<InterviewTypes.Lang, string> = {
  ENG: "English",
  KOR: "Korean",
};

export const POSITION_OPTIONS = ["ai", "be", "fe", "mobile"];
export const POSITION_OPTION_LABEL: Record<InterviewTypes.Position, string> = {
  ai: "AI/ML",
  be: "Backend",
  fe: "FrontEnd",
  mobile: "Mobile",
};
