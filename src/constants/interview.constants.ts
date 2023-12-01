enum FIXED_STEPS {
  "INTRO" = 0,
  "UPLOAD_CV" = 1,
}

enum VARIANT_STEPS {
  "COMMON_Q" = 2,
  "PERSONAL_Q" = 3,
  "FEEDBACK" = 4,
}

export const STEPS = {
  ...FIXED_STEPS,
  ...VARIANT_STEPS,
};

export const FIXED_CONVO: Record<FIXED_STEPS, { KOR: string; ENG: string }> = {
  [STEPS.INTRO]: {
    KOR: "Welcome to Interview Bot ! Please select your preferred language",
    ENG: "Welcome to Interview Bot ! Please select your preferred language",
  },
  [STEPS.UPLOAD_CV]: {
    KOR: "관심 있는 직무를 선택하고, 자기소개서 또는 이력서를 업로드해주세요.",
    ENG: "Please Upload your CV/Resume and select the position you are interested in. ",
  },
};

export const FIXED_CONVO_OPTIONS: Record<FIXED_STEPS, string[]> = {
  [STEPS.INTRO]: ["KOREAN", "ENGLISH"],
  [STEPS.UPLOAD_CV]: ["AI/ML", "Frontend", "Backend", "Mobile"],
};
