import { Button, Stack, Text } from "@chakra-ui/react";
import { FrontCamera } from "@components";
import { useStepContext } from "@contexts";
import React, { useState } from "react";
import Microphone from "./components/Microphone";
import { CurrentMediaRecorder } from "@libs";

const EnvCheck = () => {
  const { goNext } = useStepContext();
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // TODO: 화면 녹화 시 setVideo
  const [status, setStatus] = useState<"BEFORE" | "RECORDING" | "RECORDED">(
    "BEFORE"
  );

  const recorder = CurrentMediaRecorder();

  const record = () => {
    setStatus("RECORDING");
    recorder.record({
      onDataAvailable: setVideoUrl,
    });
    setTimeout(() => {
      recorder.stop();
      setStatus("RECORDED");
    }, 5000);
  };

  console.log(videoUrl);

  return (
    <Stack direction={"row"}>
      {status === "RECORDED" && !!videoUrl && (
        <video
          style={{ width: 500, height: 400, transform: "rotateY(180deg)" }}
          src={videoUrl}
          autoPlay
        />
      )}
      {status !== "RECORDED" && (
        <div
          style={{
            width: 500,
            height: 400,
            backgroundColor: "black",
            position: "relative",
          }}
        >
          {/* <div style={{ width: 20, height: 20 }}> */}
          <FrontCamera />
          {/* </div> */}
          <div style={{ position: "absolute", right: 20, bottom: 20 }}>
            <Microphone />
          </div>
        </div>
      )}

      <Stack direction={"column"}>
        <Text>지원자님의 면접 환경을 체크할게요.</Text>
        <Text>
          {`준비가 되시면 ‘환경체크 시작’을 누른 뒤 
        "안녕하세요, 잘 부탁드립니다“
        라고 말씀해주세요.`}
        </Text>
        {status === "BEFORE" && <Button onClick={record}>환경체크 시작</Button>}
        {status === "RECORDING" && <>녹화중...</>}
      </Stack>
    </Stack>
  );
};

export default React.memo(EnvCheck);
