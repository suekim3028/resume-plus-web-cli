import { INTERVIEW_CONSTS } from "@constants";
import { Layout as L } from "@design-system";
import * as S from "./ChatMain.styles";
import ChatMainContextProvider from "./ChatMainContext";
import Intro from "./components/Steps/Intro/Intro";
import TextInput from "./components/TextInput/TextInput";
import UploadCv from "./components/Steps/UploadCv/UploadCv";
import CommonQ from "./components/Steps/CommonQ/CommonQ";

const { STEPS } = INTERVIEW_CONSTS;

const ChatMain = () => {
  return (
    <ChatMainContextProvider>
      <L.FlexCol w={"100%"} h={"100%"} pv={20}>
        <S.Container>
          <Intro />
          <UploadCv />
          <CommonQ />
        </S.Container>
        <TextInput />
      </L.FlexCol>
    </ChatMainContextProvider>
  );
};

export default ChatMain;
