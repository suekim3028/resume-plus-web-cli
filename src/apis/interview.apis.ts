import { ApiTypes, InterviewTypes } from "@types";
import API from "./API";
import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES } from "react";

/**
 * CV 업로드
 */
type UploadCvParams = {
  content: string;
  position: InterviewTypes.Position;
};

export const uploadCV = async (params: UploadCvParams) => {
  // return API.post<ApiTypes.SuccessRes>("/cv", params);
};

/**
 * Common Questions 가져오기
 */
type GetCommonQResponse = {
  techQuestions: { id: number; question: string }[];
  behavQuestions: { id: number; question: string }[];
};

export const getCommonQ = async (): Promise<GetCommonQResponse> => {
  // const { tech_questions: techQuestions, behav_questions: behavQuestions } =
  //   await API.get<{
  //     tech_questions: { id: number; question: string }[];
  //     behav_questions: { id: number; question: string }[];
  //   }>("/common_question");

  const samples = Array.from({ length: 10 }, (_, id) => ({
    id,
    question: `${id} This is random question for test`,
  }));
  return { techQuestions: samples, behavQuestions: samples };
};

/**
 * Personal Questions 가져오기
 */
type GetPersonalQResponse = {
  personalQuestions: { id: number; question: string }[];
};

export const getPersonalQ = async (): Promise<GetPersonalQResponse> => {
  const { personal_questions: personalQuestions } = await API.get<{
    personal_questions: { id: number; question: string }[];
  }>("/personal_question");
  return { personalQuestions };
};

type AnswerQuestionParams = {
  questionId: number;
  answer: string;
};

/**
 * tech Q, behav Q, personal Q 답변하기
 */

export const answerTechQ = ({ questionId, answer }: AnswerQuestionParams) => {};
// API.post<InterviewTypes.Feedback>(`/submit_tech_answer/${questionId}`, {
//   answer,
// });

export const answerBehavQ = ({
  questionId,
  answer,
}: AnswerQuestionParams) => {};
// API.post<InterviewTypes.Feedback>(`/submit_behav_answer/${questionId}`, {
//   answer,
// });

export const answerPersonalQ = ({
  questionId,
  answer,
}: AnswerQuestionParams) => {};
// API.post<InterviewTypes.Feedback>(`/submit_personal_answer/${questionId}`, {
//   answer,
// });
