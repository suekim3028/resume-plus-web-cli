import { ApiTypes, InterviewTypes } from "@types";
import API from "./API";
import { jsUtils } from "@web-core";

/**
 * CV 업로드
 */
// TODO: api 타입 다시 정의
type UploadCvParams = {
  content: string;
} & InterviewTypes.InterviewInfo;

export const uploadCV = async (params: UploadCvParams) => {
  return API.post<ApiTypes.SuccessRes>("/cv", params);
};

const dummyQuestionGenerator = (
  length: number,
  type: string
): InterviewTypes.Question[] =>
  Array.from({ length }, (_, idx) => ({
    id: idx,
    question: `${type} ${idx} 질문입니다.`,
  }));

/**
 * Common Questions 가져오기
 */
type GetCommonQResponse = Record<
  Extract<InterviewTypes.QuestionType, "behavQ" | "techQ">,
  InterviewTypes.Question[]
>;

const wait = async (seconds: number) => {
  await new Promise((resolver: (v: null) => void) => {
    setTimeout(() => {
      resolver(null);
    }, seconds * 1000);
  });
};

export const getCommonQ = async (): Promise<GetCommonQResponse> => {
  // const { tech_questions: techQuestions, behav_questions: behavQuestions } =
  // await API.get<{
  //   tech_questions: InterviewTypes.Question[];
  //   behav_questions: InterviewTypes.Question[];
  // }>("/common_question");
  console.log("getCommonQ");

  await wait(1);
  return {
    techQ: dummyQuestionGenerator(5, "기술질문"),
    behavQ: dummyQuestionGenerator(5, "인성질문"),
  };
};

/**
 * Personal Questions 가져오기
 */
type GetPersonalQResponse = Record<
  Extract<InterviewTypes.QuestionType, "perQ">,
  InterviewTypes.Question[]
>;

export const getPersonalQ = async (): Promise<GetPersonalQResponse> => {
  // const { personal_questions: personalQuestions } = await API.get<{
  //   personal_questions: InterviewTypes.Question[];
  // }>("/personal_question")
  console.log("getPersonalQ");
  await wait(1);
  return {
    perQ: dummyQuestionGenerator(5, "개인질문"),
  };
};

type AnswerQuestionParams = {
  questionId: number;
  answer: string;
};

/**
 * tech Q, behav Q, personal Q 답변하기
 */

// export const answerTechQ = ({ questionId, answer }: AnswerQuestionParams) =>
//   API.post<InterviewTypes.Feedback>(`/submit_tech_answer/${questionId}`, {
//     answer,
//   });

// export const answerBehavQ = ({ questionId, answer }: AnswerQuestionParams) =>
//   API.post<InterviewTypes.Feedback>(`/submit_behav_answer/${questionId}`, {
//     answer,
//   });

// export const answerPersonalQ = ({ questionId, answer }: AnswerQuestionParams) =>
//   API.post<InterviewTypes.Feedback>(`/submit_personal_answer/${questionId}`, {
//     answer,
//   });

export const dummyAnswer = async ({
  questionId,
  answer,
  type,
}: AnswerQuestionParams & {
  type: InterviewTypes.QuestionType;
}): Promise<InterviewTypes.Feedback> => {
  jsUtils.wait(Math.random() * 2);
  return {
    question: "aaaa",
    user_answer: answer,
    type,
    questionId,
  };
};

export const answerQuestion = dummyAnswer; // TODO: type에 따라 연결

/**
 * 기업 목록 요청
 */

type GetCompaniesResponse = InterviewTypes.Company[];
export const getCompanies = () =>
  API.get<GetCompaniesResponse>("/company/names");

/**
 * 직군 목록 요청
 */

type GetJobDepartmentsResponse = InterviewTypes.JobDepartment[];
export const getJobDepartments = () =>
  API.get<GetJobDepartmentsResponse>("/company/departments");
