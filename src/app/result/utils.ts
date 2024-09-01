import { InterviewTypes } from "@types";

export const getScoreStat = (
  result: Pick<
    InterviewTypes.CompletedInterviewResult,
    "behavior" | "introduce" | "personal" | "tech"
  >
) => {
  const { tech, introduce, personal, behavior } = result;

  const techMean = calcPartMean(tech);
  const introduceMean = calcPartMean(introduce);
  const personalMean = calcPartMean(personal);
  const behaviorMean = calcPartMean(behavior);

  return {
    techMean,
    introduceMean,
    personalMean,
    behaviorMean,
    totalMean: (techMean + introduceMean + personalMean + behaviorMean) / 4,
  };
};

const calcPartMean = (partFeedbacks: InterviewTypes.Feedback[]) => {
  if (!partFeedbacks.length) return 0;

  const partTotalScore = partFeedbacks.reduce(
    (prev, f) => prev + calcOneQuestionScoreMean(f),
    0
  );

  return partTotalScore / partFeedbacks.length;
};

export const calcOneQuestionScoreMean = (f: InterviewTypes.Feedback) => {
  const questionMeanScore = f.gptEvaluation.length
    ? f.gptEvaluation.reduce((prev, curr) => {
        return prev + Number(curr.score);
      }, 0) / f.gptEvaluation.length
    : 0;

  return questionMeanScore;
};

export const findCompanyInfo = (
  interview: InterviewTypes.PendingInterviewResult,
  companyData: {
    companies: InterviewTypes.Company[];
    departments: InterviewTypes.JobDepartment[];
    jobs: InterviewTypes.Job[];
  }
): InterviewTypes.InterviewInfo => {
  const {
    companyId,
    departmentId,
    jobId,
    companyName: _companyName,
  } = interview;

  const company = companyId
    ? companyData.companies.find(({ companyId: id }) => id === companyId)
    : null;
  const companyName = _companyName || company?.companyName || "";

  const department = companyData?.departments.find(
    ({ companyDeptId: id }) => id === departmentId
  );
  const job = companyData?.jobs.find(({ companyJobId: id }) => id === jobId);

  return {
    company: companyName,
    job: job?.companyJob || "",
    department: department?.companyDept || "",
    companyThumbnailUrl: company?.thumbnailUrl || null,
    interviewId: interview.interviewId,
  };
};
