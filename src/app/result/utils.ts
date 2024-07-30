import { InterviewTypes } from "@types";

export const getScoreStat = (
  result: Pick<
    InterviewTypes.CompletedInterviewResult,
    "behavior" | "introduce" | "personal" | "tech"
  >
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
      const feedbackMean = Object.keys(f.evaluation).length
        ? Object.values(f.evaluation).reduce((prev, curr) => {
            return prev + Number(curr[0]);
          }, 0) / Object.keys(f.evaluation).length
        : 0;
      return prev + feedbackMean;
    }
  }, 0);

  return sum / arr.length;
};

export const isScoreEvaluation = (
  e: InterviewTypes.Evaluation
): e is InterviewTypes.ScoreEvaluation => {
  return "score" in e;
};
