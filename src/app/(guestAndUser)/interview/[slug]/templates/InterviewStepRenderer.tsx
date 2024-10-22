import { EventLogger } from "@components";
import { useState } from "react";
import EnterWaiting from "./EnterWaiting/EnterWaiting";
import InterviewScreen from "./InterviewMain/InterviewScreen";
import SettingCheck from "./SettingCheck/SettingCheck";
import StepCheck from "./StepCheck/StepCheck";

const STEPS = [
  "2_STEP_CHECK",
  "3_SETTING_CHECK",
  "4_ENTER_WAITING",
  "5_INTERVIEW",
] as const;

type Step = (typeof STEPS)[number];

const InterviewStepRenderer = (): JSX.Element => {
  const [step, DO_NOT_CALL_setStep] = useState<Step>("2_STEP_CHECK");

  const setStep = (step: Step) => {
    DO_NOT_CALL_setStep(step);
    switch (step) {
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
  };

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
};

export default InterviewStepRenderer;
