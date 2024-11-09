import { EventLogger } from "@components";
import { Flex } from "@uis";
import { useCallback, useRef, useState } from "react";
import Container from "../../../components/Container";
import IdleStatus from "./components/IdleStatus";
import RecordedStatus from "./components/RecordedStatus";
import RecordingStatus from "./components/RecordingStatus";

type Status = "IDLE" | "RECORDING" | "RECORDED";
const SettingCheck = ({ goNext }: { goNext: () => void }) => {
  const [settingStatus, setSettingStatus] = useState<Status>("IDLE");
  const videoUrl = useRef<string | null>(null);

  const handleRecordFinish = useCallback((url: string) => {
    videoUrl.current = url;
    setSettingStatus("RECORDED");
  }, []);

  const retryRecording = useCallback(() => {
    setSettingStatus("RECORDING");
    videoUrl.current = null;
  }, []);

  const render = useCallback((): JSX.Element => {
    switch (settingStatus) {
      case "IDLE":
        EventLogger.log("EnvironmentCheck01");
        return <IdleStatus goNext={() => setSettingStatus("RECORDING")} />;
      case "RECORDING":
        return <RecordingStatus onRecord={handleRecordFinish} />;
      case "RECORDED":
        EventLogger.log("EnvironmentCheck04");
        return (
          <RecordedStatus
            url={videoUrl.current || ""}
            goBack={retryRecording}
            goNext={goNext}
          />
        );
    }
  }, [settingStatus, handleRecordFinish, retryRecording]);

  return (
    <Container
      colSpan={10}
      colStart={2}
      bgColor="Background/Normal/Alternative"
    >
      <Flex
        w="100%"
        borderRadius={32}
        bgColor={"Static/White"}
        border={"4px solid rgba(225, 226, 228, 1)"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {render()}
      </Flex>
    </Container>
  );
};

export default SettingCheck;
