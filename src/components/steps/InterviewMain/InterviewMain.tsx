import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { FrontCamera } from "@components";
import { DisplayMediaRecorder, MediaDeviceManager } from "@libs";
import { commonHooks, jsUtils } from "@web-core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Chat from "./components/Chat";
import useInterviewAnswer from "./hooks/useInterviewAnswer";

const InterviewMain = () => {
  const [cameraOn, setCameraOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [status, setStatus] = useState<"SHOW_CHAT" | "HIDE_CHAT">("HIDE_CHAT");

  const { chats, answer, questionStep, startInterview } = useInterviewAnswer({
    onQuestion: (question) => {
      console.log(question);
      // TODO: tts;
    },
  });

  const displayRecorder = new DisplayMediaRecorder();

  const downloader = useRef<HTMLAnchorElement>(null);
  const toggleChat = useCallback(
    () => setStatus((s) => (s === "HIDE_CHAT" ? "SHOW_CHAT" : "HIDE_CHAT")),
    []
  );

  commonHooks.useAsyncEffect(async () => {
    await displayRecorder.init();
    displayRecorder.start();
    await jsUtils.wait(2);
    startInterview();
  }, []);

  const endInterview = () => {
    const url = displayRecorder.stop();

    if (!downloader.current) return;
    downloader.current.href = url;
    downloader.current.download = "test.mp4";
    downloader.current.click();
  };

  return (
    <Flex w={"100%"} h={"100%"}>
      <a style={{ display: "none" }} ref={downloader} />
      <Flex flex={1} direction={"column"}>
        <Flex h={"50px"}>
          <Text>{questionStep}</Text>
        </Flex>
        <Flex flex={1}>
          <Flex flex={1} style={{ backgroundColor: "black" }} h={"100%"} />
          <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
            <FrontCamera />
          </Flex>
        </Flex>
        <Flex h={"50px"}>
          <Button
            onClick={() => {
              setCameraOn(MediaDeviceManager.toggleCamera());
            }}
          >
            {cameraOn ? "카메라 끄기" : "카메라 켜기"}
          </Button>
          <Button
            onClick={() => {
              setAudioOn(MediaDeviceManager.toggleAudio());
            }}
          >
            {audioOn ? "마이크 끄기" : "마이크 켜기"}
          </Button>
          <Button onClick={endInterview}>영상 끝내기 (dummy)</Button>
          <Button onClick={toggleChat}>채팅 on off</Button>
        </Flex>
      </Flex>

      {status === "SHOW_CHAT" && (
        <Stack w={"35%"} h={"100%"} backgroundColor={"gray"}>
          <Chat answer={answer} chats={chats} />
        </Stack>
      )}
    </Flex>
  );
};

export default InterviewMain;
