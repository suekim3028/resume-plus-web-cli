"use client";
import { InterviewTypes } from "@types";
import { createContext, ReactNode, useContext } from "react";
import { QuestionPart, RandomQuestion } from "./types";

const InterviewInfoContext = createContext<InterviewInfoContextValue | null>(
  null
);

type InterviewInfoContextValue = {
  questions: RandomQuestion[];
  interviewInfo: InterviewTypes.InterviewInfo;
  interviewerName: string;
  questionParts: QuestionPart[];
};

const InterviewInfoContextProvider = ({
  children,
  ...info
}: {
  children: ReactNode;
} & InterviewInfoContextValue) => {
  return (
    <InterviewInfoContext.Provider value={info}>
      {children}
    </InterviewInfoContext.Provider>
  );
};

export const useInterviewInfoContext = () => {
  const context = useContext(InterviewInfoContext);

  if (!context) throw new Error();
  return context;
};

export default InterviewInfoContextProvider;
