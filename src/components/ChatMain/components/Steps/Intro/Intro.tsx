import { INTERVIEW_CONSTS } from "@constants";
import Bubble from "../../Bubble/Bubble";
import { Layout as L } from "@design-system";
import SelectChips from "../../SelectChips/SelectChips";
import React, { useState } from "react";
import { useChatMainContext } from "../../../ChatMainContext";
import { InterviewTypes } from "@types";

const { FIXED_CONVO, FIXED_CONVO_OPTIONS } = INTERVIEW_CONSTS;

const INTRO_STEP: InterviewTypes.Step = "INTRO";

const Intro = () => {
  const { step, isAfterStep, goNext } = useChatMainContext();
  const visible = isAfterStep(INTRO_STEP);
  const isCurrentStep = step === INTRO_STEP;

  const [chipsVisible, setChipsVisible] = useState(false);

  if (!visible) return <></>;

  return (
    <L.FlexCol w={"100%"}>
      <Bubble
        content={FIXED_CONVO[INTRO_STEP].ENG}
        isMine={false}
        onEndTextAnim={() => setChipsVisible(true)}
      />
      {chipsVisible && (
        <SelectChips
          options={FIXED_CONVO_OPTIONS[INTRO_STEP]}
          onSelect={goNext}
        />
      )}
    </L.FlexCol>
  );
};

export default React.memo(Intro);
