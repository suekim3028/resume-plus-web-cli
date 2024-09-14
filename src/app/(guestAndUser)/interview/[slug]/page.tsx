"use client";
import { interviewApis } from "@apis";

import { useCompanyData, useUser } from "@atoms";

import { findCompanyInfo } from "@app/(guestAndUser)/result/utils";
import { InterviewTypes } from "@types";
import { commonHooks } from "@web-core";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import EnterWaiting from "../components/EnterWaiting";
import InterviewScreen from "../components/InterviewScreen";
import QuestionWaiting, {
  QuestionWaitingRef,
} from "../components/QuestionWaiting";
import SettingCheck from "../components/SettingCheck";
import StepCheck from "../components/StepCheck";
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
  const { refreshUser } = useUser();
  const companyData = useCompanyData();

  const interviewData = useRef<{
    questions: RandomQuestion[];
    questionParts: QuestionPart[];
  }>();

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

    refreshUser();

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

  if (step === "1_QUESTION_WAITING")
    return <QuestionWaiting ref={questionWaitingRef} />;

  if (!interview.current || !interviewData.current) return <></>;

  switch (step) {
    case "2_STEP_CHECK":
      return (
        <StepCheck
          goNext={() => setStep("3_SETTING_CHECK")}
          questionParts={interviewData.current?.questionParts || []}
        />
      );

    case "3_SETTING_CHECK":
      return <SettingCheck goNext={() => setStep("4_ENTER_WAITING")} />;
    case "4_ENTER_WAITING":
      return (
        <EnterWaiting
          {...interview.current}
          goNext={() => setStep("5_INTERVIEW")}
        />
      );
    case "5_INTERVIEW":
      return (
        <InterviewScreen
          interviewInfo={interview.current}
          questions={interviewData.current?.questions || []}
        />
      );
  }
};
export default Interview;
