import { INTERVIEW_CONSTS } from "@constants";
import Bubble from "../../Bubble/Bubble";
import { Font, Layout as L } from "@design-system";
import SelectChips from "../../SelectChips/SelectChips";
import React, { useState } from "react";
import { useChatMainContext } from "../../../ChatMainContext";
import { InterviewTypes } from "@types";
import GoNextButton from "../../GoNextButton/GoNextButton";
import CameraWrapper from "../../CameraWrapper/CameraWrapper";
import { useStepContext } from "@contexts";

const { FIXED_CONVO, LANG_OPTIONS, LANG_OPTION_LABEL } = INTERVIEW_CONSTS;

const CAMERA_READY_STEP: InterviewTypes.Step = "CAMERA_READY";

const CameraReady = () => {
  const { step, goNext, setLanguage } = useChatMainContext();
  const { cameraReady } = useStepContext();

  const isCurrentStep = step === CAMERA_READY_STEP;

  if (!isCurrentStep) return <></>;

  return (
    <CameraWrapper>
      <L.FlexCol
        w={"100%"}
        h={"100%"}
        pv={30}
        ph={30}
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <L.FlexCol
          style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          p={10}
          outline={"GRAY_400"}
          rounded={10}
          mb={20}
        >
          <Font.Body
            type={"16_medium_multi"}
            color={"PRIMARY_500"}
            textAlign="center"
          >
            {FIXED_CONVO[CAMERA_READY_STEP].ENG}
          </Font.Body>
        </L.FlexCol>
        <GoNextButton onClick={goNext} canGoNext={cameraReady} text={"START"} />
      </L.FlexCol>
    </CameraWrapper>
  );
};

export default React.memo(CameraReady);
