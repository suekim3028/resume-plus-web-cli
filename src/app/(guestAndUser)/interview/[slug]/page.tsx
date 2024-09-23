"use client";
import { interviewApis } from "@apis";

import { useCompanyData } from "@atoms";

import { findCompanyInfo } from "@app/(user)/result/utils";
import { EventLogger } from "@components";
import { InterviewTypes } from "@types";
import { commonHooks, jsUtils } from "@web-core";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import EnterWaiting from "../components/EnterWaiting";
import InterviewScreen from "../components/InterviewScreen";
import QuestionWaiting, {
  QuestionWaitingRef,
} from "../components/QuestionWaiting";
import SettingCheck from "../components/SettingCheck";
import StepCheck from "../components/StepCheck";
import InterviewInfoContextProvider from "../InterviewInfoContext";
import { QuestionPart, RandomQuestion } from "../types";
import { getQuestions } from "../utils";

const STEPS = [
  "1_QUESTION_WAITING",
  "2_STEP_CHECK",
  "3_SETTING_CHECK",
  "4_ENTER_WAITING",
  "5_INTERVIEW",
] as const;

type Step = (typeof STEPS)[number];

const Interview = ({ params }: { params: { slug: number } }) => {
  const interviewId = params.slug;
  const router = useRouter();

  const [step, setStep] = useState<Step>("1_QUESTION_WAITING");
  const interview = useRef<InterviewTypes.InterviewInfo>();

  const companyData = useCompanyData();

  const interviewData = useRef<{
    questions: RandomQuestion[];
    questionParts: QuestionPart[];
  }>();

  const randomFamilyName = useRef(
    jsUtils.getRandomArrItem(["김", "이", "박", "정"])
  ).current;

  const questionWaitingRef = useRef<QuestionWaitingRef>(null);

  const effected = useRef(false);

  commonHooks.useAsyncEffect(async () => {
    if (effected.current) return;
    effected.current = true;

    const { isError: interviewInfoError, data: interviewInfoData } =
      await interviewApis.getInterviewInfo({ id: interviewId });
    if (interviewInfoError) {
      return router.back();
    }

    interview.current = findCompanyInfo(interviewInfoData, companyData);

    const { isError, data } = await getQuestions(interviewId);

    if (isError) {
      return router.back();
    }

    interviewData.current = data;

    questionWaitingRef.current &&
      (await questionWaitingRef.current.animStart());
    setStep("2_STEP_CHECK");
  }, []);

  useEffect(() => {
    switch (step) {
      case "1_QUESTION_WAITING":
        EventLogger.log("InterviewSettingLoading");
        break;
      case "2_STEP_CHECK":
        EventLogger.log("InterviewSettingConfirm");
        break;
      case "4_ENTER_WAITING":
        EventLogger.log("WaitingRoom");
        break;
      case "5_INTERVIEW":
        EventLogger.log("Interview");
        break;
      default:
        break;
    }
  }, [step]);

  if (step === "1_QUESTION_WAITING")
    return <QuestionWaiting ref={questionWaitingRef} />;

  if (!interview.current || !interviewData.current) return <></>;

  return (
    <InterviewInfoContextProvider
      interviewInfo={interview.current}
      interviewerName={randomFamilyName}
      questions={interviewData.current.questions}
      questionParts={interviewData.current.questionParts}
    >
      {(() => {
        switch (step) {
          case "2_STEP_CHECK":
            return <StepCheck goNext={() => setStep("3_SETTING_CHECK")} />;

          case "3_SETTING_CHECK":
            return <SettingCheck goNext={() => setStep("4_ENTER_WAITING")} />;
          case "4_ENTER_WAITING":
            return (
              <EnterWaiting
                {...interview.current}
                interviewerName={randomFamilyName}
                goNext={() => setStep("5_INTERVIEW")}
              />
            );
          case "5_INTERVIEW":
            return <InterviewScreen />;
        }
      })()}
    </InterviewInfoContextProvider>
  );
};
export default Interview;
