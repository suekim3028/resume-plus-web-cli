import { Button, Flex, Stack } from "@chakra-ui/react";
import { FrontCamera } from "@components";
import { DisplayMediaRecorder, MediaDeviceManager } from "@libs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const InterviewMain = () => {
  const [cameraOn, setCameraOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [status, setStatus] = useState<"SHOW_CHAT" | "HIDE_CHAT">("HIDE_CHAT");

  const displayRecorder = useRef(DisplayMediaRecorder());
  const [displayRecord, setDisplayRecord] = useState<string | null>(null);

  const downloader = useRef<HTMLAnchorElement>(null);
  const toggleChat = useCallback(
    () => setStatus((s) => (s === "HIDE_CHAT" ? "SHOW_CHAT" : "HIDE_CHAT")),
    []
  );

  useEffect(() => {
    displayRecorder.current.record({ onDataAvailable: setDisplayRecord });
  }, []);

  const endInterview = () => {
    displayRecorder.current.stop();
    if (!downloader.current || !displayRecord) return;
    downloader.current.href = displayRecord;
    downloader.current.download = "test.mp4";
    downloader.current.click();
  };

  return (
    <Flex flex={1}>
      <a style={{ display: "none" }} ref={downloader} />
      <Flex flex={1} direction={"column"}>
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
        <Stack w={"35%"} backgroundColor={"gray"}></Stack>
      )}
    </Flex>
  );
};

export default InterviewMain;
