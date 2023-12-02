import { INTERVIEW_CONSTS } from "@constants";
import Bubble from "../../Bubble/Bubble";
import { Layout as L } from "@design-system";
import SelectChips from "../../SelectChips/SelectChips";
import React, { useEffect, useRef, useState } from "react";
import { useChatMainContext } from "../../../ChatMainContext";
import { InterviewTypes } from "@types";
import GoNextButton from "../../GoNextButton/GoNextButton";
import * as S from "./CommonQ.styles";

const CommonQStep: InterviewTypes.Step = "COMMON_Q";

const CommonQ = () => {
  const {
    step,
    isAfterStep,
    goNext,
    setPosition,
    setLocalPdfFile,
    canGoNext,
    commonQBubbles,
  } = useChatMainContext();

  const visible = isAfterStep(CommonQStep);
  const isCurrentStep = step === CommonQStep;

  if (!visible) return <></>;

  return (
    <L.FlexCol w={"100%"} mt={20}>
      {commonQBubbles.map(({ isMine, text }) => (
        <Bubble
          key={text}
          content={text}
          isMine={isMine}
          // onEndTextAnim={() => setTextAnimEnd(true)}
        />
      ))}
    </L.FlexCol>
  );
};

export default React.memo(CommonQ);
