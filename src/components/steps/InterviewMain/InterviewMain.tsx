import { Button, Stack } from "@chakra-ui/react";
import { FrontCamera } from "@components";
import { MediaDeviceManager } from "@libs";
import { useState } from "react";

const InterviewMain = () => {
  const [cameraOn, setCameraOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  return (
    <Stack direction={"row"}>
      <Stack>
        <Stack direction={"row"}>
          <div
            style={{
              position: "relative",
              border: "1px solid red",
              width: 500,
              height: 500,
              backgroundColor: "black",
            }}
          />
          <div
            style={{
              position: "relative",
              border: "1px solid red",
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
    </Stack>
  );
};

export default InterviewMain;
