import { interviewApis } from "@apis";
import { INTERVIEW_CONSTS } from "@constants";
import { InterviewTypes } from "@types";
import { QuestionPart, RandomQuestion } from "./types";

export const getQuestions = async (
  interviewId: number
): Promise<
  | { isError: true; data: null }
  | {
      isError: false;
      data: { questions: RandomQuestion[]; questionParts: QuestionPart[] };
    }
> => {
  const [
    { isError: commonQError, data: commonQData },
    { isError: personalQError, data: personalQData },
    { isError: introduceQError, data: introduceQData },
  ] = await Promise.all([
    interviewApis.getCommonQ(interviewId),
    interviewApis.getPersonalQ(interviewId),
    interviewApis.getIntroduceQ(interviewId),
  ]);

  if (commonQError || personalQError || introduceQError) {
    return { isError: true, data: null };
  }
  const introduceQs: RandomQuestion[] = introduceQData.introduce_questions.map(
    (q): RandomQuestion => ({ type: "introduce", ...q })
  );

  const techQs: RandomQuestion[] = commonQData.tech_questions.map(
    (q): RandomQuestion => ({ type: "tech", ...q })
  );

  const behavQs: RandomQuestion[] = commonQData.behav_questions.map(
    (q): RandomQuestion => ({ type: "behavior", ...q })
  );

  const personalQs: RandomQuestion[] = personalQData.personal_questions.map(
    (q): RandomQuestion => ({ type: "personal", ...q })
  );
  const questions = [...introduceQs, ...personalQs, ...techQs, ...behavQs];

  return {
    isError: false,
    data: {
      questions,
      questionParts: [
        genQuestionPart(1, "introduce", introduceQs),
        genQuestionPart(2, "personal", introduceQs),
        genQuestionPart(3, "tech", introduceQs),
        genQuestionPart(4, "behavior", introduceQs),
      ],
    },
  };
};

const genQuestionPart = (
  index: number,
  partType: InterviewTypes.QuestionType,
  questions: InterviewTypes.Question[]
): QuestionPart => ({
  index,
  name: INTERVIEW_CONSTS.PART_LABEL[partType],
  questionCount: questions.length,
  duration:
    INTERVIEW_CONSTS.PART_DURATION_PER_QUESTION[partType] * questions.length,
});
