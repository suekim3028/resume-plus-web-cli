"use client";
import { commonHooks } from "@web-core";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import QuestionWaiting, {
  QuestionWaitingRef,
} from "../components/QuestionWaiting";
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
  const interviewData = useRef<{
    questions: RandomQuestion[];
    questionParts: QuestionPart[];
  }>();

  const questionWaitingRef = useRef<QuestionWaitingRef>(null);

  commonHooks.useAsyncEffect(async () => {
    const { isError, data } = await getQuestions(interviewId);

    if (isError) {
      alert("질문 생성에서 에러가 발생했습니다. 다시 시도해주세요.");
      return router.back();
    }

    interviewData.current = data;

    questionWaitingRef.current &&
      (await questionWaitingRef.current.animStart());
    setStep("2_STEP_CHECK");
  }, []);

  switch (step) {
    case "1_QUESTION_WAITING":
      return <QuestionWaiting ref={questionWaitingRef} />;
    case "2_STEP_CHECK":
      return (
        <StepCheck
          goNext={() => setStep("3_SETTING_CHECK")}
          questionParts={interviewData.current?.questionParts || []}
        />
      );
    default:
      break;
  }
};
export default Interview;
