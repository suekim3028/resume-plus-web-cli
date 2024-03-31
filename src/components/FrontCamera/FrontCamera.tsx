import { Font, Layout as L } from "@design-system";
import { useOnWindowSizeChange } from "@hooks";
import { MediaDeviceManager } from "@libs";
import { commonHooks } from "@web-core";
import { useCallback, useEffect, useState } from "react";

const FrontCamera = () => {
  const [cameraReady, setCameraReady] = useState(false);

  commonHooks.useAsyncEffect(async () => {
    const mediaStream = await MediaDeviceManager.getMediaStream();
    const _video = document.querySelector("#videoElement");
    const video = _video as HTMLVideoElement;
    const cloned = mediaStream.clone();
    cloned.getAudioTracks().forEach((t) => (t.enabled = false));
    video.srcObject = cloned;
    setCameraReady(true);
  }, []);

  return (
    <L.FlexCol w="100%" h={"100%"}>
      <L.AbsoluteFill bgColor="GRAY_600">
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
      {!cameraReady && (
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
    </L.FlexCol>
  );
};
export default FrontCamera;
