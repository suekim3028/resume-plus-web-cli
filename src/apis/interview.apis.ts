import { InterviewTypes } from "@types";
import API from "./API";

/**
 * CV 업로드
 */
type UploadCvParams = {
  content: string;
  name: string;
  isDefault: boolean;
  position: string;
};

export const uploadCV = async (body: UploadCvParams) =>
  API.post<{ resumeId: number }>("/resume/", { body });

const genQ = (name: string) =>
  Array.from(
    { length: 1 },
    (_, i): InterviewTypes.Question => ({
      questionId: i,
      question: `${name} ${i}번`,
    })
  );

export const getTechQ = async (interviewId: number) =>
  API.get<InterviewTypes.Question[]>(
    `/question/tech/${interviewId}`,
    undefined,
    {
      dummyData: genQ("tech"),
      useDummy: false,
    }
  );

/**
 * Personal Questions 가져오기
 */

export const getPersonalQ = async (interviewId: number) =>
  API.get<InterviewTypes.Question[]>(
    `/question/personal/${interviewId}`,
    undefined,
    {
      dummyData: genQ("personal"),
      useDummy: false,
    }
  );

/**
 * 자기소개 질문 가져오기
 */

export const getIntroduceQ = async (interviewId: number) =>
  API.get<InterviewTypes.Question[]>(
    `/question/introduce/${interviewId}`,
    undefined,
    {
      dummyData: genQ("introduce"),
      useDummy: false,
    }
  );

/**
 * 인성 질문 가져오기
 */

export const getBehaviorQ = async (interviewId: number) =>
  API.get<InterviewTypes.Question[]>(
    `/question/behavior/${interviewId}`,
    undefined,
    {
      dummyData: genQ("behavior"),
      useDummy: false,
    }
  );

/**
 * 질문 답변 보내기
 */
type AnswerQuestionParams = {
  questionId: number;
  answer: string;
  type: InterviewTypes.QuestionType;
  interviewId: number;
};

/**
 * tech Q, behav Q, personal Q 답변하기
 */

export const answerQuestion = ({ type, ...body }: AnswerQuestionParams) =>
  API.post(`/answer/${type}`, { body });

/**
 * 기업 목록 요청
 */

type GetCompaniesResponse = InterviewTypes.Company[];
export const getCompanies = () =>
  API.get<GetCompaniesResponse>("/company/name", undefined, {
    dummyData: Array.from({ length: 20 }, (_, idx) => ({
      companyId: idx,
      companyName: `회사wefwefweffwefwefwefewfwfwefwefwwef ${idx}번`,
    })),
    useDummy: false,
  });

/**
 * 직군 목록 요청
 */

type GetDepartmentsResponse = InterviewTypes.JobDepartment[];
export const getDepartments = () =>
  API.get<GetDepartmentsResponse>("/company/department", undefined, {
    dummyData: Array.from({ length: 20 }, (_, idx) => ({
      companyDeptId: idx,
      companyDept: `직군awefawefawef ${idx}번`,
    })),
    useDummy: false,
  });

/**
 * 직무 목록 요청
 */

type GetJobsResponse = InterviewTypes.Job[];
export const getJobs = () =>
  API.get<GetJobsResponse>("/company/job", undefined, {
    dummyData: Array.from({ length: 20 }, (_, idx) => ({
      companyJobId: idx,
      companyJob: `직무aefwawefawfewafewafewfa ${idx}번`,
    })),
    useDummy: false,
  });

/**
 * 면접 만들기
 */
export type CreateInterviewReq = {
  departmentId: number;
  jobId: number;
  interviewRound: "1차 면접";
  resumeId: number;
} & (
  | {
      companyId: number;
      companyName?: undefined;
    }
  | {
      companyName: string;
      companyId?: undefined;
    }
);

type CreateInterviewRes = {
  interviewId: number;
};

export const createInterview = (body: CreateInterviewReq) =>
  API.post<CreateInterviewRes>("/interview/", { body });

/**
 *
 */

type GetCompletedInterviewResultListResponse = {
  resultList: InterviewTypes.CompletedInterviewResult[];
};

export const getCompletedInterviewResultList = () =>
  API.get<GetCompletedInterviewResultListResponse>(
    "interview/?status=done",
    undefined,
    {
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
      useDummy: false,
    }
  );

type GetPendingREsultListResponse = {
  resultList: InterviewTypes.PendingInterviewResult[];
};

export const getPendingResultList = () =>
  API.get<GetPendingREsultListResponse>(
    "interview/?status=pending",
    undefined,
    {
      dummyData: {
        resultList: Array.from({ length: 10 }, (_, idx) => ({
          companyId: idx,
          jobId: idx,
          departmentId: idx,
          interviewId: idx,
          createdAt: "2024. 3. 25 (토) 23:31",
        })),
      },
      useDummy: false,
    }
  );

const genEvaluation1 = () =>
  Array.from(
    { length: 8 },
    (_, idx): InterviewTypes.Feedback => ({
      question: `질문 ${idx}`,
      questionId: idx,
      userAnswer: `대답 ${idx}`,
      gptEvaluation: [
        {
          criteria: "절디ㅓㅈㅁ리ㅏㅓㄷㅈㄹㅁ",
          rationale: `이유이유이ㅠㅇ ${idx}`,
          score: idx,
        },
        {
          criteria: "절디ㅓㅈㅁ리ㅏㅓㄷㅈㄹㅁ",
          rationale: `이유이유이ㅠㅇ ${idx}`,
          score: idx,
        },
        {
          criteria: "절디ㅓㅈㅁ리ㅏㅓㄷㅈㄹㅁ",
          rationale: `이유이유이ㅠㅇ ${idx}`,
          score: idx,
        },
      ],
    })
  );

const genEvaluation2 = () =>
  Array.from(
    { length: 8 },
    (_, idx): InterviewTypes.Feedback => ({
      question: `질문 ${idx}`,
      questionId: idx,
      userAnswer: `대답 ${idx}`,
      gptEvaluation: [
        {
          rationale: `이유이유이ㅠㅇ ${idx}`,
          score: idx,
        },
        {
          rationale: `이유이유이ㅠㅇ ${idx}`,
          score: idx,
        },
        {
          rationale: `이유이유이ㅠㅇ ${idx}`,
          score: idx,
        },
      ],
    })
  );

export const deleteInterview = ({ id }: { id: number }) =>
  API.delete(`interview/${id}`);

/**
 * 인터뷰 정보 가져오기
 */

type GetInterviewInfoResponse = {
  interviewId: number;
  companyId?: number;
  companyName?: string;
  jobId: number;
  departmentId: number;
  createdAt: string;
};

export const getInterviewInfo = ({ id }: { id: number }) =>
  API.get<GetInterviewInfoResponse>(`interview/${id}`);
