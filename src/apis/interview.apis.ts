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
  return API.post<ApiTypes.SuccessRes>("/cv", params);
};

/**
 * Common Questions 가져오기
 */
type GetCommonQResponse = {
  techQuestions: { id: number; question: string }[];
  behavQuestions: { id: number; question: string }[];
};

export const getCommonQ = async (): Promise<GetCommonQResponse> => {
  const { tech_questions: techQuestions, behav_questions: behavQuestions } =
    await API.get<{
      tech_questions: { id: number; question: string }[];
      behav_questions: { id: number; question: string }[];
    }>("/common_question");
  return { techQuestions, behavQuestions };
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

type AnswerTechQResponse = Omit<InterviewTypes.Feedback, "evaluation"> & {
  evaluation: { evaluation: InterviewTypes.Evaluation[] };
};

export const answerTechQ = async ({
  questionId,
  answer,
}: AnswerQuestionParams): Promise<InterviewTypes.Feedback> => {
  const {
    evaluation: { evaluation },
    ...res
  } = await API.post<AnswerTechQResponse>(
    `/submit_tech_answer/${questionId}`,
    answer
  );

  return {
    ...res,
    evaluation,
  };
};

type AnswerBehavQResponse = Omit<InterviewTypes.Feedback, "evaluation"> & {
  evaluation: InterviewTypes.Evaluation;
};

export const answerBehavQ = async ({
  questionId,
  answer,
}: AnswerQuestionParams): Promise<InterviewTypes.Feedback> => {
  const { evaluation, ...res } = await API.post<AnswerBehavQResponse>(
    `/submit_behav_answer/${questionId}`,
    answer
  );

  return { ...res, evaluation: [evaluation] };
};

export const answerPersonalQ = async ({
  questionId,
  answer,
}: AnswerQuestionParams): Promise<InterviewTypes.Feedback> => {
  return await API.post<InterviewTypes.Feedback>(
    `/submit_personal_answer/${questionId}`,
    answer
  );
};
