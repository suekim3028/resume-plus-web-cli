import { InterviewTypes } from "@types";

export const isScoreEval = (
  evaluation: InterviewTypes.Evaluation
): evaluation is InterviewTypes.ScoreEvaluation =>
  "score" in evaluation && "rationale" in evaluation;
