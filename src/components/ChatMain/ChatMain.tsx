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
