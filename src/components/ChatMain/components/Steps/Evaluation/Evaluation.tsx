import { Layout as L } from "@design-system";
import { InterviewTypes } from "@types";
import React from "react";
import { useChatMainContext } from "../../../ChatMainContext";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";

const EvaluationStep: InterviewTypes.Step = "EVALUATION";

const Evaluation = () => {
  const { step, isAfterStep, isLoading } = useChatMainContext();

  const visible = isAfterStep(EvaluationStep);
  const isCurrentStep = step === EvaluationStep;

  if (!visible) return <></>;

  return (
    <L.FlexCol w={"100%"} mt={20}>
      {isLoading && isCurrentStep && (
        <LoadingIndicator indicator="Analyzing your responses for feedback..." />
      )}
      {!isLoading && <></>}
    </L.FlexCol>
  );
};

export default React.memo(Evaluation);
