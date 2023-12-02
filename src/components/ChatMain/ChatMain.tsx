import { INTERVIEW_CONSTS } from "@constants";
import { Layout as L } from "@design-system";
import * as S from "./ChatMain.styles";
import ChatMainContextProvider from "./ChatMainContext";
import Intro from "./components/Steps/Intro/Intro";
import TextInput from "./components/TextInput/TextInput";
import UploadCv from "./components/Steps/UploadCv/UploadCv";
import Questions from "./components/Steps/Questions/Questions";

const { STEPS } = INTERVIEW_CONSTS;

const ChatMain = () => {
  return (
    <ChatMainContextProvider>
      <L.FlexCol
        w="100%"
        style={{
          flex: 1,
          width: "100%",
          overflowY: "scroll",
        }}
      >
        <S.Container>
          <Intro />
          <UploadCv />
          <Questions />
        </S.Container>
      </L.FlexCol>
      <TextInput />
    </ChatMainContextProvider>
  );
};

export default ChatMain;
