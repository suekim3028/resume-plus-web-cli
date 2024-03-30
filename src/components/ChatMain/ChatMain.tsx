import { StepContextProvider, useStepContext } from "@contexts";
import { Layout as L } from "@design-system";
import React from "react";
import * as S from "./ChatMain.styles";
import UploadCv from "./steps/UploadCv/UploadCv";
import EnvCheck from "./steps/EnvCheck/EnvCheck";
import QuestionLoading from "./steps/QuestionLoading/QuestionLoading";

const StepComponent = (): JSX.Element => {
  const { step } = useStepContext();
  console.log("===STEP COMPOENTN", step);

  return <>???</>;
  switch (step) {
    case "UPLOAD_CV":
      return <UploadCv />;
    case "QUESTION_LOADING":
      return <QuestionLoading />;
    case "QUESTION_READY":
      return <></>;
    case "ENV_CHECK":
      return <EnvCheck />;
    case "INTERVIEW_LOADING":
      return <></>;
    case "INTERVIEW_ING":
      return <></>;
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
