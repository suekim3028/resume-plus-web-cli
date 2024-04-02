import { Button, Stack, Text } from "@chakra-ui/react";
import { FrontCamera } from "@components";
import { useStepContext } from "@contexts";
import React, { useState } from "react";
import Microphone from "./components/Microphone";
import { CurrentMediaRecorder } from "@libs";

type Status = "BEFORE" | "RECORDING" | "RECORDED";
const EnvCheck = () => {
  const { goNext } = useStepContext();
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // TODO: 화면 녹화 시 setVideo
  const [status, setStatus] = useState<Status>("BEFORE");

  const recorder = CurrentMediaRecorder();

  const record = () => {
    setStatus("RECORDING");
    setVideoUrl(null);
    recorder.record({
      onDataAvailable: setVideoUrl,
    });
    setTimeout(() => {
      recorder.stop();
      setStatus("RECORDED");
    }, 5000);
  };

  const LABELS: Record<Status, { title: string; body: string }> = {
    BEFORE: {
      title: "지원자님의 면접 환경을 체크할게요.",
      body: `준비가 되시면 ‘환경체크 시작’을 누른 뒤 
      " 안녕하세요,  잘 부탁드립니다“라고
      말씀해주세요.`,
    },
    RECORDING: {
      title: `“ 안녕하세요,  잘 부탁드립니다.”`,
      body: `카메라 정면을 응시한 상태로, 
      5 초 이내에 위 문구를 읽어주세요.`,
    },
    RECORDED: {
      title: "면접 환경 체크가 완료되었어요 ",
      body: `영상이 정상 녹화되었는지 확인해주세요.
      면접 환경에 문제가 없다면 ‘확인’을 눌러주세요.`,
    },
  };

  const renderButtons = () => {
    switch (status) {
      case "BEFORE":
        return <Button onClick={record}>환경체크 시작</Button>;
      case "RECORDING":
        return <>녹화중...</>;
      case "RECORDED":
        return (
          <Stack direction={"row"}>
            <Button onClick={record}>다시하기</Button>
            <Button onClick={goNext}>확인</Button>
          </Stack>
        );
    }
  };
  console.log(videoUrl);

  return (
    <Stack direction={"row"}>
      {status === "RECORDED" && !!videoUrl && (
        <video style={{ width: 500, height: 400 }} src={videoUrl} controls />
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
        <Text>{LABELS[status]["title"]}</Text>
        <Text>{LABELS[status]["body"]}</Text>
        {renderButtons()}
      </Stack>
    </Stack>
  );
};

export default React.memo(EnvCheck);
