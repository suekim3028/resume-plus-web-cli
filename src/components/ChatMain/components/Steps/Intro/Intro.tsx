import { INTERVIEW_CONSTS } from "@constants";
import Bubble from "../../Bubble/Bubble";
import { Font, Layout as L } from "@design-system";
import SelectChips from "../../SelectChips/SelectChips";
import React, { useState } from "react";
import { useChatMainContext } from "../../../ChatMainContext";
import { InterviewTypes } from "@types";
import GoNextButton from "../../GoNextButton/GoNextButton";

const { FIXED_CONVO, LANG_OPTIONS, LANG_OPTION_LABEL } = INTERVIEW_CONSTS;

const INTRO_STEP: InterviewTypes.Step = "INTRO";

const Intro = () => {
  const { step, goNext, setLanguage, canGoNext } = useChatMainContext();

  const isCurrentStep = step === INTRO_STEP;

  if (!isCurrentStep) return <></>;

  return (
    <L.FlexCol
      w={"100%"}
      flex={1}
      pv={30}
      ph={30}
      alignItems="center"
      justifyContent="center"
    >
      <L.FlexCol alignItems="center" w={"60%"}>
        <Font.Body
          type={"16_medium_multi"}
          color={"PRIMARY_500"}
          mb={20}
          textAlign="center"
        >
          {FIXED_CONVO[INTRO_STEP].ENG}
        </Font.Body>

        <SelectChips<InterviewTypes.Lang>
          options={LANG_OPTIONS.map((value) => ({
            value,
            text: LANG_OPTION_LABEL[value],
          }))}
          onSelect={setLanguage}
          selectable={isCurrentStep}
        />
        <GoNextButton onClick={goNext} canGoNext={canGoNext} />
      </L.FlexCol>
    </L.FlexCol>
  );
};

export default React.memo(Intro);
