import { interviewApis } from "@apis";
import { InterviewTypes } from "@types";
import { withErrorHandling } from "@utils";

class _InterviewManager {
  private commonQs: InterviewTypes.Question[] = [];
  private personalQs: InterviewTypes.Question[] = [];

  private commonQReceived = false;
  private personalQReceived = false;

  private commonQResolver: ((value: null) => void) | null = null;
  private personalQResolver: ((value: null) => void) | null = null;

  private currentCommonQIdx = -1;
  private currentPersonalQIdx = -1;

  private feedbacks: Record<number, InterviewTypes.Feedback | null> = {};
  private feedbackResolver: ((value: null) => void) | null = null;

  private waitForCommonQ = async () => {
    if (this.commonQReceived) return;
    await new Promise(
      (resolver: (value: null) => void) => (this.commonQResolver = resolver)
    );
    return;
  };

  private waitForPersonalQ = async () => {
    if (this.personalQReceived) return;
    await new Promise(
      (resolver: (value: null) => void) => (this.personalQResolver = resolver)
    );
    return this.personalQResolver;
  };

  private getCommonQs = async () => {
    const { isError: isCommonQError, data: commonQData } =
      await withErrorHandling(() => interviewApis.getCommonQ());
    if (isCommonQError) return;
    const { behavQuestions, techQuestions } = commonQData;

    this.commonQs = [
      ...behavQuestions.map(
        (obj): InterviewTypes.Question => ({ ...obj, type: "behav_q" })
      ),
      ...techQuestions.map(
        (obj): InterviewTypes.Question => ({ ...obj, type: "tech_q" })
      ),
    ].toSorted((_a, _b) => Math.random() - 0.5);

    this.commonQs.forEach((question) => (this.feedbacks[question.id] = null));

    this.commonQReceived = true;
    if (this.commonQResolver) {
      this.commonQResolver(null);
      this.commonQResolver = null;
    }
  };

  private getPrivateQs = async () => {
    const { isError: isPersonalQError, data: personalQData } =
      await withErrorHandling(() => interviewApis.getPersonalQ());
    if (isPersonalQError) return;
    const { personalQuestions } = personalQData;
    this.personalQs = personalQuestions.map(
      (obj): InterviewTypes.Question => ({ ...obj, type: "personal_q" })
    );

    this.personalQs.forEach((question) => (this.feedbacks[question.id] = null));

    this.personalQReceived = true;
    if (this.personalQResolver) {
      this.personalQResolver(null);
      this.personalQResolver = null;
    }
  };

  public initQuestions = () => {
    this.getCommonQs();
    this.getPrivateQs();
  };

  public getNextQuestion = async () => {
    await this.waitForCommonQ();
    if (this.currentCommonQIdx < this.commonQs.length - 1) {
      this.currentCommonQIdx += 1;
      return this.commonQs[this.currentCommonQIdx];
    }
    await this.waitForPersonalQ();

    this.currentPersonalQIdx += 1;

    if (this.currentPersonalQIdx === this.personalQs.length - 1) {
      return null;
    }

    return this.personalQs[this.currentPersonalQIdx];
  };

  private checkFeedbackFinish = () =>
    this.commonQReceived &&
    this.personalQReceived &&
    Object.values(this.feedbacks).every(Boolean);

  public answer = async (question: InterviewTypes.Question, answer: string) => {
    const { type, id } = question;
    const answerFn =
      type === "behav_q"
        ? interviewApis.answerBehavQ
        : type === "tech_q"
        ? interviewApis.answerTechQ
        : interviewApis.answerPersonalQ;

    const { isError: isAnswerError, data: res } = await withErrorHandling(() =>
      answerFn({
        questionId: id,
        answer,
      })
    );

    console.log({ question, type, res });

    if (isAnswerError) return;

    this.feedbacks[id] = res;

    // 마지막 피드백인 경우 resolve
    if (this.checkFeedbackFinish() && this.feedbackResolver) {
      this.feedbackResolver(null);
      this.feedbackResolver = null;
    }
  };

  public getFeedback = async () => {
    if (this.checkFeedbackFinish()) {
      return this.feedbacks;
    }

    await new Promise(
      (resolver: (value: null) => void) => (this.feedbackResolver = resolver)
    );
    return this.feedbacks;
  };
}

const InterviewManager = new _InterviewManager();
export default InterviewManager;
