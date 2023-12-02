import { Layout as L } from "@design-system";
import { InterviewTypes } from "@types";
import React from "react";
import { useChatMainContext } from "../../../ChatMainContext";

const EvaluationStep: InterviewTypes.Step = "EVALUATION";

const Evaluation = () => {
  const { step, isAfterStep, isLoading } = useChatMainContext();

  const visible = isAfterStep(EvaluationStep);
  const isCurrentStep = step === EvaluationStep;

  if (!visible) return <></>;

  return (
    <L.FlexCol w={"100%"} mt={20}>
      {isLoading && isCurrentStep && <>피드백 생성중 ~</>}
      {!isLoading && <></>}
    </L.FlexCol>
  );
};

export default React.memo(Evaluation);
