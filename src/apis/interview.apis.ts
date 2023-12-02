import { ApiTypes, InterviewTypes } from "@types";
import API from "./API";

/**
 * CV 업로드
 */
type UploadCvParams = {
  content: string;
  position: InterviewTypes.Position;
};

export const uploadCV = async (params: UploadCvParams) =>
  // API.post<ApiTypes.SuccessRes>("/cv", { params });
  {
    console.log("UPLOADING CV...");
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
        console.log(params);
      }, 1500);
    });
  };

/**
 * Common Questions 가져오기
 */
type GetCommonQResponse = {
  techQuestions: { id: number; question: string }[];
  behavQuestions: { id: number; question: string }[];
};

export const getCommonQ = async (): Promise<GetCommonQResponse> => {
  // const {tech_questions: techQuestions, behav_questions: behavQuestions} = await  API.get<{tech_questions: string[], behav_questions: string[]}>("/common_question")
  // return {techQuestions, behavQuestions }
  console.log("GETTING COMMON Q...");

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 1500);
  });

  return {
    techQuestions: Array.from({ length: 4 }, (_, i) => ({
      id: i + 200,
      question: `tech_${i + 200}`,
    })),
    behavQuestions: Array.from({ length: 4 }, (_, i) => ({
      id: i + 300,
      question: `behav_${i + 300}`,
    })),
  };
};

/**
 * Personal Questions 가져오기
 */
type GetPersonalQResponse = {
  personalQuestions: { id: number; question: string }[];
};

export const getPersonalQ = async (): Promise<GetPersonalQResponse> => {
  // const {personal_questions: personalQuestions} = await  API.get<{personal_questions: string[], }>("/personal_question")
  // return {personalQuestions }
  console.log("GETTING PERSONAL Q...");

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 1500);
  });

  return {
    personalQuestions: Array.from({ length: 4 }, (_, i) => ({
      id: i + 100,
      question: `personal_${i + 100}`,
    })),
  };
};

type AnswerQuestionParams = {
  questionId: number;
  answer: string;
};

/**
 * tech Q, behav Q, personal Q 답변하기
 */

export const answerTechQ = async ({
  questionId,
  answer,
}: AnswerQuestionParams): Promise<InterviewTypes.Feedback<"tech_q">> => {
  return {
    type: "tech_q",
    question: `tech_q_${questionId}`,
    user_answer: answer,
    evaluation: {
      criteria: `${questionId} criteria`,
      rationale: `평가평가평가`,
      score: Math.floor(Math.random() * 5),
    },
  };
};
// API.post<InterviewTypes.Feedback<"tech_q">>(
//   `/submit_tech_answer/${questionId}`,
//   answer
// );

export const answerBehavQ = async ({
  questionId,
  answer,
}: AnswerQuestionParams): Promise<InterviewTypes.Feedback<"behav_q">> => {
  return {
    type: "behav_q",
    question: `behav_q_${questionId}`,
    user_answer: answer,
    evaluation: {
      criteria: `${questionId} criteria`,
      rationale: `평가평가평가`,
      score: Math.floor(Math.random() * 5),
    },
  };
};
// =>
//   API.post<InterviewTypes.Feedback<"behav_q">>(
//     `/submit_behav_answer/${questionId}`,
//     answer
// );
export const answerPersonalQ = async ({
  questionId,
  answer,
}: AnswerQuestionParams): Promise<InterviewTypes.Feedback<"personal_q">> => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
      console.log(`personal ${questionId} 평가 완료`);
    }, 4000);
  });

  return {
    type: "personal_q",
    question: `behav_q_${questionId}`,
    user_answer: answer,
    evaluation: {
      evaluation: [
        {
          criteria: `${questionId} criteria_ 1번`,
          rationale: `평가평가평가`,
          score: Math.floor(Math.random() * 5),
        },
        {
          criteria: `${questionId} criteria_ 2번`,
          rationale: `평가평가평가`,
          score: Math.floor(Math.random() * 5),
        },

        {
          criteria: `${questionId} criteria_ 3번`,
          rationale: `평가평가평가`,
          score: Math.floor(Math.random() * 5),
        },
      ],
    },
  };
};
// =>
//   API.post<InterviewTypes.Feedback<"personal_q">>(
//     `/submit_personal_answer/${questionId}`,
//     answer
//   );
