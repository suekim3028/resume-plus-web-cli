import { INTERVIEW_CONSTS } from "@constants";
import Bubble from "../../Bubble/Bubble";
import { Layout as L } from "@design-system";
import SelectChips from "../../SelectChips/SelectChips";
import React, { useState } from "react";

const { STEPS, FIXED_CONVO, FIXED_CONVO_OPTIONS } = INTERVIEW_CONSTS;

const Intro = ({ isCurrentStep }: { isCurrentStep: boolean }) => {
  const [chipsVisible, setChipsVisible] = useState(false);
  console.log("????");

  return (
    <L.FlexCol w={"100%"}>
      <Bubble
        content={FIXED_CONVO[STEPS.INTRO].ENG}
        isMine={false}
        onEndTextAnim={() => setChipsVisible(true)}
      />
      {chipsVisible && (
        <SelectChips
          options={FIXED_CONVO_OPTIONS[STEPS.INTRO]}
          onSelect={() => {}}
        />
      )}
    </L.FlexCol>
  );
};

export default React.memo(Intro);
