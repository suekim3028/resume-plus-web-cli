import { Button, Stack } from "@chakra-ui/react";
import { FrontCamera } from "@components";
import { DisplayMediaRecorder, MediaDeviceManager } from "@libs";
import { useEffect, useMemo, useRef, useState } from "react";

const InterviewMain = () => {
  const [cameraOn, setCameraOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const displayRecorder = useRef(DisplayMediaRecorder());
  const [displayRecord, setDisplayRecord] = useState<string | null>(null);

  const downloader = useRef<HTMLAnchorElement>(null);

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
    <Stack direction={"row"}>
      <a style={{ display: "none" }} ref={downloader} />
      <Stack>
        <Stack direction={"row"}>
          <div
            style={{
              position: "relative",
              width: 500,
              height: 500,
              backgroundColor: "black",
            }}
          />
          <div
            style={{
              position: "relative",
              width: 500,
              height: 500,
            }}
          >
            <FrontCamera />
          </div>
        </Stack>
        <Stack direction={"row"}>
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
        </Stack>
      </Stack>
      <Button onClick={endInterview}>영상 끝내기 (dummy)</Button>
    </Stack>
  );
};

export default InterviewMain;
