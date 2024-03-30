import { StepContextProvider, useStepContext } from "@contexts";
import { Layout as L } from "@design-system";
import React from "react";
import * as S from "./ChatMain.styles";
import UploadCv from "./steps/UploadCv/UploadCv";

const StepComponent = (): JSX.Element => {
  const { step } = useStepContext();

  switch (step) {
    case "UPLOAD_CV":
      return <UploadCv />;
    case "INTERVIEW_ING":
      return <></>;
    default:
      return <></>; // TODO
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
