import { DIMENSIONS } from "@constants";
import { useOnWindowSizeChange } from "@hooks";
import { withErrorHandling } from "@utils";
import React, { useCallback, useEffect, useRef } from "react";
import { Font, Layout as L } from "@design-system";
import { useChatMainContext } from "../../ChatMainContext";
import { useStepContext } from "@contexts";

const CameraWrapper = ({ children }: { children?: React.ReactNode }) => {
  const { step, goNext, setLanguage, canGoNext } = useChatMainContext();
  const { onCameraReady } = useStepContext();

  useOnWindowSizeChange(
    useCallback(() => {
      getDevices({ onReady: onCameraReady });
    }, [onCameraReady])
  );

  return (
    <L.FlexCol w="100%" h={"100%"}>
      <L.AbsoluteFill>
        <video
          autoPlay
          disableRemotePlayback
          disablePictureInPicture
          width={"100%"}
          height={"100%"}
          id="videoElement"
          style={{
            objectFit: "fill",
          }}
          controls={false}
          playsInline
        />
      </L.AbsoluteFill>
      {true && (
        <L.AbsoluteFill bgColor="GRAY_800">
          <L.FlexCol
            w={"100%"}
            h={"100%"}
            alignItems="center"
            justifyContent="center"
          >
            <Font.Body
              type={"16_medium_multi"}
              color={"BASIC_WHITE"}
              textAlign="center"
            >
              Setting camera...
            </Font.Body>
          </L.FlexCol>
        </L.AbsoluteFill>
      )}
      {children}
    </L.FlexCol>
  );
};

const getDevices = async ({ onReady }: { onReady: () => void }) => {
  const _video = document.querySelector("#videoElement");

  if (!_video) return;

  try {
    const videoMediaStream = await navigator.mediaDevices?.getUserMedia({
      video: {
        facingMode: { ideal: "user" },
      },
    });

    const video = _video as HTMLVideoElement;
    video.srcObject = videoMediaStream;
    onReady();
  } catch (e) {
    console.log("no front camera");
  }
};

export default CameraWrapper;
