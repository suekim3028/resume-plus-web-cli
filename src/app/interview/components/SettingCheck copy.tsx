import { CurrentMediaRecorder } from "@libs";
import { Button, Flex, Text } from "@uis";
import { useRef, useState } from "react";
import Container from "./Container";
type Status = "IDLE" | "READY" | "RECORDING" | "RECORDED";

const SettingCheck = () => {
  const [status, setStatus] = useState<Status>("IDLE");
  const videoUrl = useRef<string | null>(null);
  const recorder = CurrentMediaRecorder();

  const record = () => {
    setStatus("RECORDING");
    videoUrl.current = null;
    recorder.record({
      onDataAvailable: (url) => (videoUrl.current = url),
    });
  };

  const stop = () => {
    recorder.stop();
    videoUrl.current = "RECORDED";
  };

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
        py={226}
        border={"4px solid rgba(225, 226, 228, 1)"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Ready />
      </Flex>
    </Container>
  );
};

const Idle = () => {
  return (
    <>
      <Text type="Title3" color="Static/Black" fontWeight={"500"} mb={64}>
        원활한 면접을 위해 웹캠과 마이크 환경을 점검할게요
      </Text>
      <Button
        type="Solid_Primary"
        title="다음"
        size="Large"
        flexProps={{ width: 228 }}
      />
    </>
  );
};

const Ready = () => {
  return (
    <Flex flex={1} direction={"row"}>
      <></>
    </Flex>
  );
};

export default SettingCheck;
