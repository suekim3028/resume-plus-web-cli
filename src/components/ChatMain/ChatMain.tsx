import { INTERVIEW_CONSTS } from "@constants";
import { Layout as L } from "@design-system";
import * as S from "./ChatMain.styles";
import ChatMainContextProvider from "./ChatMainContext";
import Intro from "./components/Steps/Intro/Intro";
import TextInput from "./components/TextInput/TextInput";
import UploadCv from "./components/Steps/UploadCv/UploadCv";
import Questions from "./components/Steps/Questions/Questions";
import { useRef } from "react";
import Evaluation from "./components/Steps/Evaluation/Evaluation";
import CameraView from "./components/CameraView/CameraView";

const ChatMain = () => {
  const chatDivRef = useRef<HTMLDivElement>(null);
  return (
    <ChatMainContextProvider scrollRef={chatDivRef}>
      <L.FlexCol
        w="100%"
        style={{
          flex: 1,
          width: "100%",
          overflowY: "scroll",
        }}
        bgColor="GRAY_200"
        ref={chatDivRef}
      >
        <S.Container>
          <CameraView />
          <Intro />
          <UploadCv />
          <Questions />
          <Evaluation />
        </S.Container>
      </L.FlexCol>

      <TextInput />
    </ChatMainContextProvider>
  );
};

export default ChatMain;
