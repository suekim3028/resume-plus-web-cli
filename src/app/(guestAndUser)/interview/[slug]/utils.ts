"use client";
import { INTERVIEW_CONSTS } from "@constants";
import { InterviewTypes } from "@types";

const calcDurationOfQuestions = (
  questions: InterviewTypes.Question[],
  type: InterviewTypes.QuestionType
) => {
  return (
    questions.length *
    INTERVIEW_CONSTS.QUESTION_DURATION_IN_MINUTES_BY_TYPE[type]
  );
};

const calcStatsByType = (
  questions: Record<InterviewTypes.QuestionType, InterviewTypes.Question[]>
): InterviewTypes.InterviewProcessStat["statsByType"] => {
  const { behavior, introduce, tech, personal } = questions;

  return {
    behavior: {
      durationInMinutes: calcDurationOfQuestions(behavior, "behavior"),
      numberOfQuestions: behavior.length,
    },
    tech: {
      durationInMinutes: calcDurationOfQuestions(tech, "tech"),
      numberOfQuestions: tech.length,
    },
    introduce: {
      durationInMinutes: calcDurationOfQuestions(introduce, "introduce"),
      numberOfQuestions: introduce.length,
    },
    personal: {
      durationInMinutes: calcDurationOfQuestions(personal, "personal"),
      numberOfQuestions: personal.length,
    },
  };
};

export const genInterviewProcessStats = (
  questions: Record<InterviewTypes.QuestionType, InterviewTypes.Question[]>
): InterviewTypes.InterviewProcessStat => {
  const statsByType = calcStatsByType(questions);

  const totalStat = Object.values(statsByType).reduce(
    (totalStat, statByType) => ({
      durationInMinutes:
        totalStat.durationInMinutes + statByType.durationInMinutes,
      numberOfQuestions:
        totalStat.numberOfQuestions + statByType.numberOfQuestions,
    }),
    {
      durationInMinutes: 0,
      numberOfQuestions: 0,
    }
  );

  return {
    ...totalStat,
    statsByType,
  };
};

export const genTypeAttachedQuestions = (
  questions: InterviewTypes.Question[],
  type: InterviewTypes.QuestionType
): InterviewTypes.QuestionWithType[] => {
  return questions.map(
    (q): InterviewTypes.QuestionWithType => ({ ...q, type })
  );
};
