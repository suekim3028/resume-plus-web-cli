import { INTERVIEW_CONSTS } from "@constants";
import Bubble from "../../Bubble/Bubble";
import { Layout as L } from "@design-system";
import SelectChips from "../../SelectChips/SelectChips";
import React, { useState } from "react";
import { useChatMainContext } from "../../../ChatMainContext";
import { InterviewTypes } from "@types";

const { FIXED_CONVO, LANG_OPTIONS, LANG_OPTION_LABEL } = INTERVIEW_CONSTS;

const INTRO_STEP: InterviewTypes.Step = "INTRO";

const Intro = () => {
  const { step, isAfterStep, goNext, setLanguage } = useChatMainContext();
  const visible = isAfterStep(INTRO_STEP);
  const isCurrentStep = step === INTRO_STEP;

  const [chipsVisible, setChipsVisible] = useState(false);

  const onSelect = (lang: InterviewTypes.Lang) => {
    setLanguage(lang);
    goNext();
  };

  if (!visible) return <></>;

  return (
    <L.FlexCol w={"100%"}>
      <Bubble
        content={FIXED_CONVO[INTRO_STEP].ENG}
        isMine={false}
        onEndTextAnim={() => setChipsVisible(true)}
      />
      {chipsVisible && isCurrentStep && (
        <SelectChips
          options={LANG_OPTIONS.map((value) => ({
            value,
            text: LANG_OPTION_LABEL[value],
          }))}
          onSelect={onSelect}
        />
      )}
    </L.FlexCol>
  );
};

export default React.memo(Intro);
