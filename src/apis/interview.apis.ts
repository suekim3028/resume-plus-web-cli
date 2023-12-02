import { ApiTypes, InterviewTypes } from "@types";
import API from "./API";

/**
 * CV 업로드
 */
type UploadCvParams = {
  content: string;
  position: InterviewTypes.Position;
};

export const uploadCV = (params: UploadCvParams) =>
  API.post<ApiTypes.SuccessRes>("/cv", { params });

/**
 * Common Questions 가져오기
 */
type GetCommonQResponse = {
  tech_questions: string[];
  behav_questions: string[];
};

export const getCommonQ = () => API.get<GetCommonQResponse>("/common_question");

/**
 * Personal Questions 가져오기
 */
type GetPersonalQResponse = {};
export const getPersonalQ = () => API.get<GetPersonalQResponse>("");

type AnswerQuestionParams = {
  questionId: number;
  answer: string;
};

/**
 * tech Q, behav Q, personal Q 답변하기
 */

export const answerTechQ = ({ questionId, answer }: AnswerQuestionParams) =>
  API.post<InterviewTypes.Feedback<"tech_q">>(
    `/submit_tech_answer/${questionId}`,
    answer
  );

export const answerBehavQ = ({ questionId, answer }: AnswerQuestionParams) =>
  API.post<InterviewTypes.Feedback<"behav_q">>(
    `/submit_behav_answer/${questionId}`,
    answer
  );
export const answerPersonalQ = ({ questionId, answer }: AnswerQuestionParams) =>
  API.post<InterviewTypes.Feedback<"personal_q">>(
    `/submit_personal_answer/${questionId}`,
    answer
  );
