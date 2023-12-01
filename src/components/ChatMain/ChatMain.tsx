import { Layout as L } from "@design-system";
import { useState } from "react";
import Bubble from "./components/Bubble/Bubble";
import * as S from "./ChatMain.styles";
import TextInput from "./components/TextInput/TextInput";
import { INTERVIEW_CONSTS } from "@constants";
import Intro from "./components/Steps/Intro/Intro";

const { STEPS } = INTERVIEW_CONSTS;

const ChatMain = () => {
  const [step, setStep] = useState(STEPS.INTRO);

  return (
    <L.FlexCol w={"100%"} h={"100%"}>
      <S.Container>{step <= STEPS.INTRO && <Intro />}</S.Container>
      <TextInput />
    </L.FlexCol>
  );
};

export default ChatMain;
