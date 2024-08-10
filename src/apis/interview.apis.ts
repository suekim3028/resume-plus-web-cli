import { InterviewTypes } from "@types";
import API from "./API";

/**
 * CV 업로드
 */
type UploadCvParams = {
  content: string;
  resume_name: string;
  is_default: boolean;
};

export const uploadCV = async (body: UploadCvParams) => {
  return API.post<{ resumeId: number }>("/resume", { body });
};

/**
 * Common Questions 가져오기
 */

type GetCommonQResponse = {
  tech_questions: InterviewTypes.Question[];
  behav_questions: InterviewTypes.Question[];
};

const genQ = (name: string) =>
  Array.from(
    { length: 2 },
    (_, i): InterviewTypes.Question => ({ id: i, question: `${name} ${i}번` })
  );

export const getCommonQ = async (interviewId: number) =>
  API.get<GetCommonQResponse>(`/question/common/${interviewId}`, undefined, {
    dummyData: {
      tech_questions: genQ("tech"),
      behav_questions: genQ("behav"),
    },
    dummyWaitSecs: 4,
  });

/**
 * Personal Questions 가져오기
 */

type GetPersonalQResponse = { personal_questions: InterviewTypes.Question[] };

export const getPersonalQ = async (interviewId: number) =>
  API.get<GetPersonalQResponse>(
    `/question/personal/${interviewId}`,
    undefined,
    {
      dummyData: { personal_questions: genQ("personal") },
      dummyWaitSecs: 4,
    }
  );

/**
 * 자기소개 질문 가져오기
 */
type GetIntroduceQResponse = { introduce_questions: InterviewTypes.Question[] };

export const getIntroduceQ = async (interviewId: number) =>
  API.get<GetIntroduceQResponse>(
    `/question/introduce/${interviewId}`,
    undefined,
    { dummyData: { introduce_questions: genQ("introduce") }, dummyWaitSecs: 4 }
  );

/**
 * 질문 답변 보내기
 */
type AnswerQuestionParams = {
  questionId: number;
  answer: string;
  type: InterviewTypes.QuestionType;
};

/**
 * tech Q, behav Q, personal Q 답변하기
 */

export const answerQuestion = ({
  questionId,
  type,
  answer,
}: {
  questionId: number;
  type: InterviewTypes.QuestionType;
  answer: string;
}) =>
  API.post<InterviewTypes.Feedback>(`/answer/${type}/${questionId}`, {
    body: {
      answer,
    },
  });

/**
 * 기업 목록 요청
 */

type GetCompaniesResponse = InterviewTypes.Company[];
export const getCompanies = () =>
  API.get<GetCompaniesResponse>("/company/names", undefined, {
    dummyData: Array.from({ length: 20 }, (_, idx) => ({
      id: idx,
      name: `회사wefwefweffwefwefwefewfwfwefwefwwef ${idx}번`,
    })),
  });

/**
 * 직군 목록 요청
 */

type GetDepartmentsResponse = InterviewTypes.JobDepartment[];
export const getDepartments = () =>
  API.get<GetDepartmentsResponse>("/company/departments", undefined, {
    dummyData: Array.from({ length: 20 }, (_, idx) => ({
      id: idx,
      department: `직군awefawefawef ${idx}번`,
    })),
  });

/**
 * 직무 목록 요청
 */

type GetJobsResponse = InterviewTypes.Job[];
export const getJobs = () =>
  API.get<GetJobsResponse>("/company/jobs", undefined, {
    dummyData: Array.from({ length: 20 }, (_, idx) => ({
      id: idx,
      job: `직무aefwawefawfewafewafewfa ${idx}번`,
    })),
  });

const dummyQuestionGenerator = (
  length: number,
  type: string
): InterviewTypes.Question[] =>
  Array.from({ length }, (_, idx) => ({
    id: idx,
    question: `${type} ${idx} 질문입니다.`,
  }));

/**
 * 면접 만들기
 */
export type CreateInterviewReq = {
  companyId: number;
  departmentId: number;
  jobId: number;
  interviewRound: "1차 면접";
  resumeId: number;
};

type CreateInterviewRes = {
  interviewId: number;
};

export const createInterview = (body: CreateInterviewReq) =>
  API.post<CreateInterviewRes>("/interview", { body });

/**
 *
 */

type GetCompletedInterviewResultListResponse = {
  resultList: InterviewTypes.CompletedInterviewResult[];
};

export const getCompletedInterviewResultList = () =>
  API.get<GetCompletedInterviewResultListResponse>("", undefined, {
    dummyData: {
      resultList: Array.from({ length: 10 }, (_, idx) => ({
        companyId: idx,
        jobId: idx,
        departmentId: idx,
        createdAt: "2024. 3. 25 (토) 23:31",
        behavior: genEvaluation1(),
        introduce: genEvaluation1(),
        personal: genEvaluation2(),
        tech: genEvaluation2(),
        interviewId: idx,
      })),
    },
  });

type GetPendingREsultListResponse = {
  resultList: InterviewTypes.PendingInterviewResult[];
};

export const getPendingResultList = () =>
  API.get<GetPendingREsultListResponse>("", undefined, {
    dummyData: {
      resultList: Array.from({ length: 10 }, (_, idx) => ({
        companyId: idx,
        jobId: idx,
        departmentId: idx,
        interviewId: idx,
        createdAt: "2024. 3. 25 (토) 23:31",
      })),
    },
  });

const genEvaluation1 = () =>
  Array.from(
    { length: 8 },
    (_, idx): InterviewTypes.Feedback => ({
      question: `질문 ${idx}`,
      questionId: idx,
      user_answer: `대답 ${idx}`,
      evaluation: {
        criteria1: [`${idx}`, `이유이유이유이유 ${idx}`],
        criteria2: [`${idx}`, `이유이유이유이유 ${idx}`],
        criteria3: [`${idx}`, `이유이유이유이유 ${idx}`],
        criteria4: [`${idx}`, `이유이유이유이유 ${idx}`],
      },
    })
  );

const genEvaluation2 = () =>
  Array.from(
    { length: 8 },
    (_, idx): InterviewTypes.Feedback => ({
      question: `질문 ${idx}`,
      questionId: idx,
      user_answer: `대답 ${idx}`,
      evaluation: { rationale: `이유이유이유 ${idx}`, score: idx },
    })
  );
