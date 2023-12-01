import { INTERVIEW_CONSTS } from "@constants";
import Bubble from "../../Bubble/Bubble";
import { Layout as L } from "@design-system";
import SelectChips from "../../SelectChips/SelectChips";
import React, { useState } from "react";
import { useChatMainContext } from "../../../ChatMainContext";
import { InterviewTypes } from "@types";
import GoNextButton from "../../GoNextButton/GoNextButton";
import * as S from "./UploadCv.styles";

const { FIXED_CONVO, POSITION_OPTIONS, POSITION_OPTION_LABEL } =
  INTERVIEW_CONSTS;

const CV_STEP: InterviewTypes.Step = "UPLOAD_CV";

const Intro = () => {
  const { step, isAfterStep, goNext, setPosition, position } =
    useChatMainContext();
  const visible = isAfterStep(CV_STEP);
  const isCurrentStep = step === CV_STEP;

  const [textAnimEnd, setTextAnimEnd] = useState(false);

  if (!visible) return <></>;

  return (
    <L.FlexCol w={"100%"}>
      <Bubble
        content={FIXED_CONVO[CV_STEP].ENG}
        isMine={false}
        onEndTextAnim={() => setTextAnimEnd(true)}
      />
      {textAnimEnd && (
        <L.FlexCol w={"100%"}>
          <SelectChips<InterviewTypes.Position>
            options={POSITION_OPTIONS.map((value) => ({
              value,
              text: POSITION_OPTION_LABEL[value],
            }))}
            onSelect={setPosition}
            selectable={isCurrentStep}
          />

          <S.PdfFileInput type={"file"} accept=".pdf" id="image_uploads" />
        </L.FlexCol>
      )}

      {isCurrentStep && (
        <GoNextButton onClick={goNext} canGoNext={!!position} />
      )}
    </L.FlexCol>
  );
};

export default React.memo(Intro);
