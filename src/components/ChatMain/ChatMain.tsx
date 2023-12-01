import { Layout as L } from "@design-system";
import { useState } from "react";
import Bubble from "./components/Bubble/Bubble";
import * as S from "./ChatMain.styles";
import TextInput from "./components/TextInput/TextInput";
const ChatMain = () => {
  const [step, setStep] = useState<"INTRO" | "UPLOAD_CV" | "BEH_Q">("INTRO");
  return (
    <L.FlexCol w={"100%"} h={"100%"}>
      <S.Container>
        <L.FlexRow>
          <Bubble content={"wefwfew"} isMine={false} />
        </L.FlexRow>
      </S.Container>
      <TextInput />
    </L.FlexCol>
  );
};

export default ChatMain;
