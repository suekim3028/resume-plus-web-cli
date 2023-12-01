import { INTERVIEW_CONSTS } from "@constants";

export type FixedStep = (typeof INTERVIEW_CONSTS.FIXED_STEPS)[number];
export type VariantStep = (typeof INTERVIEW_CONSTS.VARIANT_STEPS)[number];
export type Step = (typeof INTERVIEW_CONSTS.STEPS)[number];

export type Lang = "ENG" | "KOR";
