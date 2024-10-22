import { InterviewTypes } from "@types";
import { createContext, ReactNode, useContext } from "react";
import { genTypeAttachedQuestions } from "./utils";

type InterviewQuestionsContextValue = {
  questionsWithType: InterviewTypes.QuestionWithType[];
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

  return (
    <InterviewQuestionsContext.Provider value={{ questionsWithType }}>
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
