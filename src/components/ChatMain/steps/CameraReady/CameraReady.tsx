import { INTERVIEW_CONSTS } from "@constants";
import { useStepContext } from "@contexts";
import { Font, Layout as L } from "@design-system";
import { InterviewTypes } from "@types";
import React from "react";
import CameraWrapper from "../../components/CameraWrapper/CameraWrapper";
import GoNextButton from "../../components/GoNextButton/GoNextButton";

const { FIXED_CONVO } = INTERVIEW_CONSTS;

const CAMERA_READY_STEP: InterviewTypes.Step = "CAMERA_READY";

const CameraReady = () => {
  const { cameraReady, goNext } = useStepContext();

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
        <GoNextButton
          onClick={goNext}
          canGoNext={cameraReady}
          text={{
            ENG: "START",
            KOR: "시작하기",
          }}
        />
      </L.FlexCol>
    </CameraWrapper>
  );
};

export default React.memo(CameraReady);
