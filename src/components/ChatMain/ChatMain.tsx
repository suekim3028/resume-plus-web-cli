import { StepContextProvider, useStepContext } from "@contexts";
import { Layout as L } from "@design-system";
import React from "react";
import * as S from "./ChatMain.styles";
import {
  EnvCheck,
  InterviewLoading,
  InterviewMain,
  QuestionLoading,
  QuestionReady,
  UploadCv,
  EvaluationLoading,
} from "@components/steps";

const StepComponent = (): JSX.Element => {
  const { step } = useStepContext();

  switch (step) {
    case "UPLOAD_CV":
      return <UploadCv />;
    case "QUESTION_LOADING":
      return <QuestionLoading />;
    case "QUESTION_READY":
      return <QuestionReady />;
    case "ENV_CHECK":
      return <EnvCheck />;
    case "INTERVIEW_LOADING":
      return <InterviewLoading />;
    case "INTERVIEW_MAIN":
      return <InterviewMain />;
    case "EVALUATION_LOADING":
      return <EvaluationLoading />;
      case 
  }
};

const ChatMain = () => {
  return (
    <StepContextProvider>
      <L.FlexCol
        style={{
          width: "100%",
          height: "100%",
        }}
        bgColor="BASIC_WHITE"
      >
        <StepComponent />
      </L.FlexCol>
    </StepContextProvider>
  );
};

export default ChatMain;
