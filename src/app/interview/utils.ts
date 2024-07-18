import { interviewApis } from "@apis";
import { InterviewTypes } from "@types";

type RandomQuestion = {
  type: InterviewTypes.QuestionType;
} & InterviewTypes.Question;

export const getQuestions = async (
  interviewId: number
): Promise<
  { isError: true; data: null } | { isError: false; data: RandomQuestion[] }
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

  return {
    isError: false,
    data: [...introduceQs, ...personalQs, ...techQs, ...behavQs],
  };
};
