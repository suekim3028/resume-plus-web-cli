import { Layout as L } from "@design-system";
import { InterviewTypes } from "@types";
import React from "react";
import { useChatMainContext } from "../../../ChatMainContext";
import Bubble from "../../Bubble/Bubble";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";

const CommonQStep: InterviewTypes.Step = "COMMON_Q";
const PersonalQStep: InterviewTypes.Step = "PERSONAL_Q";

const CommonQ = () => {
  const { step, isAfterStep, questionBubbles, isLoading } =
    useChatMainContext();

  const visible = isAfterStep(CommonQStep);
  const isCurrentStep = step === CommonQStep || step === PersonalQStep;

  if (!visible) return <></>;

  return (
    <L.FlexCol w={"100%"} mt={20}>
      {questionBubbles.map(({ isMine, text }, idx) => (
        <Bubble key={idx} content={text} isMine={isMine} />
      ))}
      {isLoading && isCurrentStep && (
        <LoadingIndicator indicator="・ ・ ・ Generating questions" />
      )}
    </L.FlexCol>
  );
};

export default React.memo(CommonQ);
