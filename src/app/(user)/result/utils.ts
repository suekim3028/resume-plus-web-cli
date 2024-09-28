import { InterviewTypes } from "@types";

export const getScoreStat = (
  result: Pick<
    InterviewTypes.CompletedInterviewResult,
    | "behaviorFeedback"
    | "introduceFeedback"
    | "personalFeedback"
    | "techFeedback"
  >
) => {
  const {
    techFeedback,
    introduceFeedback,
    personalFeedback,
    behaviorFeedback,
  } = result;

  const techMean = calcPartMean(techFeedback);
  const introduceMean = calcPartMean(introduceFeedback);
  const personalMean = calcPartMean(personalFeedback);
  const behaviorMean = calcPartMean(behaviorFeedback);

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
    departmentGroups: InterviewTypes.DepartmentGroup[];
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

  const department = companyData?.departmentGroups.find(
    ({ departmentId: id }) => id === departmentId
  );

  const job =
    companyData.departmentGroups
      .find(({ departmentId }) => departmentId === departmentId)
      ?.job.find(({ companyJobId }) => companyJobId === jobId) || null;

  return {
    company: companyName,
    job: job?.companyJob || "",
    department: department?.department || "",
    companyThumbnailUrl: company?.imageUrl || null,
    interviewId: interview.interviewId,
  };
};
