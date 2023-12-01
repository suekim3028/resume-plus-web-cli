import { Layout as L } from "@design-system";
import { useState } from "react";
import Bubble from "./components/Bubble/Bubble";
import * as S from "./ChatMain.styles";
import TextInput from "./components/TextInput/TextInput";
import { INTERVIEW_CONSTS } from "@constants";
import Intro from "./components/Steps/Intro/Intro";
import ChatMainContextProvider from "./ChatMainContext";

const { STEPS } = INTERVIEW_CONSTS;

const ChatMain = () => {
  return (
    <ChatMainContextProvider>
      <L.FlexCol w={"100%"} h={"100%"}>
        <S.Container>
          <Intro />
        </S.Container>
        <TextInput />
      </L.FlexCol>
    </ChatMainContextProvider>
  );
};

export default ChatMain;
