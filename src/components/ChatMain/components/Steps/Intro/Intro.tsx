import { INTERVIEW_CONSTS } from "@constants";
import Bubble from "../../Bubble/Bubble";
import { Layout as L } from "@design-system";
import SelectChips from "../../SelectChips/SelectChips";
import React, { useState } from "react";
import { useChatMainContext } from "../../../ChatMainContext";
import { InterviewTypes } from "@types";
import GoNextButton from "../../GoNextButton/GoNextButton";

const { FIXED_CONVO, LANG_OPTIONS, LANG_OPTION_LABEL } = INTERVIEW_CONSTS;

const INTRO_STEP: InterviewTypes.Step = "INTRO";

const Intro = () => {
  const { step, isAfterStep, goNext, setLanguage, canGoNext } =
    useChatMainContext();
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
        <SelectChips<InterviewTypes.Lang>
          options={LANG_OPTIONS.map((value) => ({
            value,
            text: LANG_OPTION_LABEL[value],
          }))}
          onSelect={setLanguage}
          selectable={isCurrentStep}
        />
      )}
      {isCurrentStep && <GoNextButton onClick={goNext} canGoNext={canGoNext} />}
    </L.FlexCol>
  );
};

export default React.memo(Intro);
