import { InterviewTypes } from "@types";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { genInterviewProcessStats, genTypeAttachedQuestions } from "../utils";

type InterviewQuestionsContextValue = {
  questions: Record<InterviewTypes.QuestionType, InterviewTypes.Question[]>;
  sortedQuestionsWithType: InterviewTypes.QuestionWithType[];
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
  const sortedQuestionsWithType: InterviewTypes.QuestionWithType[] = useMemo(
    () => [
      ...genTypeAttachedQuestions(questions.introduce, "introduce"),
      ...genTypeAttachedQuestions(questions.personal, "personal"),
      ...genTypeAttachedQuestions(questions.tech, "tech"),
      ...genTypeAttachedQuestions(questions.behavior, "behavior"),
    ],
    [] // question 바뀌지 않는 것 확신
  );

  const processStats = genInterviewProcessStats(questions);

  return (
    <InterviewQuestionsContext.Provider
      value={{ sortedQuestionsWithType, questions, processStats }}
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
