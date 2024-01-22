import { interviewApis } from "@apis";
import { InterviewTypes } from "@types";
import { withErrorHandling } from "@utils";

class _InterviewManager {
  private commonQs: InterviewTypes.Question[] = [];
  private personalQs: InterviewTypes.Question[] = [];

  private commonQReceived = false;
  private personalQReceived = false;

  private commonQResolvers: ((value: null) => void)[] = [];
  private personalQResolvers: ((value: null) => void)[] = [];

  public waitForCommonQs = async () => {
    if (this.commonQReceived) return this.commonQs;
    await new Promise((resolver: (value: null) => void) =>
      this.commonQResolvers.push(resolver)
    );

    return this.commonQs;
  };

  public waitForPersonalQs = async () => {
    if (this.personalQReceived) return this.personalQs;
    await new Promise((resolver: (value: null) => void) =>
      this.personalQResolvers.push(resolver)
    );
    return this.personalQs;
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
    this.commonQReceived = true;
    this.commonQResolvers.forEach((resolver) => resolver(null));
  };

  private getPrivateQs = async () => {
    const { isError: isPersonalQError, data: personalQData } =
      await withErrorHandling(() => interviewApis.getPersonalQ());
    if (isPersonalQError) return;
    const { personalQuestions } = personalQData;
    this.personalQs = personalQuestions.map(
      (obj): InterviewTypes.Question => ({ ...obj, type: "personal_q" })
    );
    this.personalQReceived = true;
    this.personalQResolvers.forEach((resolver) => resolver(null));
  };

  public initQuestions = () => {
    this.getCommonQs();
    this.getPrivateQs();
  };
}

const InterviewManager = new _InterviewManager();
export default InterviewManager;
