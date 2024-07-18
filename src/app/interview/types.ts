import { InterviewTypes } from "@types";

export type RandomQuestion = {
  type: InterviewTypes.QuestionType;
} & InterviewTypes.Question;

export type QuestionPart = {
  index: number;
  name: string;
  questionCount: number;
  duration: number;
};
