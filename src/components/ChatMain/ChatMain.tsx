import { StepContextProvider, useStepContext } from "@contexts";
import { Layout as L } from "@design-system";
import React from "react";
import * as S from "./ChatMain.styles";
import CameraReady from "./components/Steps/CameraReady/CameraReady";
import Evaluation from "./components/Steps/Evaluation/Evaluation";
import Intro from "./components/Steps/Intro/Intro";
import Questions from "./components/Steps/Questions/Questions";
import UploadCv from "./components/Steps/UploadCv/UploadCv";

const StepComponent: React.FC = () => {
  const { step } = useStepContext();

  switch (step) {
    case "INTRO":
      return <Intro />;
    case "CAMERA_READY":
      return <CameraReady />;
    case "EVALUATION":
      return <Evaluation />;
    case "QUESTIONS":
      return <Questions />;
    case "UPLOAD_CV":
      return <UploadCv />;
  }
};

const ChatMain = () => {
  return (
    <StepContextProvider>
      <L.FlexCol
        w="100%"
        style={{
          flex: 1,
          width: "100%",
          overflowY: "scroll",
        }}
        bgColor="BASIC_WHITE"
      >
        <S.Container>
          <StepComponent />
        </S.Container>
      </L.FlexCol>
    </StepContextProvider>
  );
};

export default ChatMain;
