import { InterviewTypes } from "@types";
import { createContext, ReactNode, useContext } from "react";
import { genInterviewProcessStats, genTypeAttachedQuestions } from "../utils";

type InterviewQuestionsContextValue = {
  questions: Record<InterviewTypes.QuestionType, InterviewTypes.Question[]>;
  questionsWithType: InterviewTypes.QuestionWithType[];
  processStats: InterviewTypes.InterviewProcessStat;
};

const InterviewQuestionsContext =
  createContext<InterviewQuestionsContextValue | null>(null);

const InterviewQuestionsContextProvider = ({
  children,
  questions,
}: {
  children: ReactNode;
  questions: Record<InterviewTypes.QuestionType, InterviewTypes.Question[]>;
}) => {
  const questionsWithType: InterviewTypes.QuestionWithType[] = [
    ...genTypeAttachedQuestions(questions.introduce, "introduce"),
    ...genTypeAttachedQuestions(questions.personal, "personal"),
    ...genTypeAttachedQuestions(questions.tech, "tech"),
    ...genTypeAttachedQuestions(questions.behavior, "behavior"),
  ];

  const processStats = genInterviewProcessStats(questions);

  return (
    <InterviewQuestionsContext.Provider
      value={{ questionsWithType, questions, processStats }}
    >
      {children}
    </InterviewQuestionsContext.Provider>
  );
};

export const useInterviewQuestionsContext = () => {
  const ctx = useContext(InterviewQuestionsContext);
  if (!ctx)
    throw new Error(
      "[InterviewQuestionsContext] ctx must be used in provider."
    );
  return ctx;
};

export default InterviewQuestionsContextProvider;
