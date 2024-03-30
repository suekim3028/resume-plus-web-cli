import { ApiTypes, InterviewTypes } from "@types";
import API from "./API";

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

const dummyQuestionGenerator = (length: number): InterviewTypes.Question[] =>
  Array.from({ length }, (_, idx) => ({ id: idx, question: "ababababbaba" }));

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

  await wait(3);
  return {
    techQ: dummyQuestionGenerator(5),
    behavQ: dummyQuestionGenerator(5),
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
  await wait(2);
  return {
    perQ: dummyQuestionGenerator(5),
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
}): Promise<InterviewTypes.Feedback> => ({
  question: "aaaa",
  user_answer: "bbbb",
  type,
});

export const answerTechQ = dummyAnswer;
export const answerBehavQ = dummyAnswer;
export const answerPersonalQ = dummyAnswer;
