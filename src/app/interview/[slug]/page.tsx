"use client";
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
  const interview: InterviewTypes.InterviewInfo = {
    company: { companyId: 0, companyName: "테스트 회사" },
    job: { companyJobId: 0, companyJob: "테스트 직무" },
    department: { companyDeptId: 0, companyDept: "테스트 직군" },
  };
  const router = useRouter();
  const [step, setStep] = useState<Step>("1_QUESTION_WAITING");
  const interviewData = useRef<{
    questions: RandomQuestion[];
    questionParts: QuestionPart[];
  }>();

  const [data, setData] = useState<{
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

    console.log(data);
    interviewData.current = data;
    setData(data);

    questionWaitingRef.current &&
      (await questionWaitingRef.current.animStart());
    setStep("2_STEP_CHECK");
  }, []);

  if (data)
    return (
      <InterviewScreen
        interviewInfo={interview}
        questions={data?.questions || []}
      />
    );

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

    case "3_SETTING_CHECK":
      return <SettingCheck goNext={() => setStep("4_ENTER_WAITING")} />;
    case "4_ENTER_WAITING":
      return (
        <EnterWaiting {...interview} goNext={() => setStep("5_INTERVIEW")} />
      );
    case "5_INTERVIEW":
      return (
        <InterviewScreen
          interviewInfo={interview}
          questions={interviewData.current?.questions || []}
        />
      );
    default:
      break;
  }
};
export default Interview;
