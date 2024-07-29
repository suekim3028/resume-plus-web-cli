import { InterviewTypes } from "@types";

export const getScoreStat = (
  result: InterviewTypes.CompletedInterviewResult
) => {
  const { tech, introduce, personal, behavior } = result;

  const techMean = getFeedbackListMean(tech);
  const introduceMean = getFeedbackListMean(introduce);
  const personalMean = getFeedbackListMean(personal);
  const behaviorMean = getFeedbackListMean(behavior);

  return {
    techMean,
    introduceMean,
    personalMean,
    behaviorMean,
    totalMean: (techMean + introduceMean + personalMean + behaviorMean) / 4,
  };
};

const getFeedbackListMean = (arr: InterviewTypes.Feedback[]) => {
  if (!arr.length) return 0;
  const sum = arr.reduce((prev, f) => {
    if (!f?.evaluation) return prev;
    if (isScoreEvaluation(f.evaluation)) {
      return prev + f.evaluation.score;
    } else {
      return prev + Number(f.evaluation[0]);
    }
  }, 0);

  return sum / arr.length;
};

export const isScoreEvaluation = (
  e: InterviewTypes.Evaluation
): e is InterviewTypes.ScoreEvaluation => {
  return "score" in e;
};
