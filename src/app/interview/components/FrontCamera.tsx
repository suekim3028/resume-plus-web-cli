import { WEBSITE_CONSTS } from "@constants";

import { MediaDeviceManager } from "@libs";
import { Flex, Text } from "@uis";
import { commonHooks } from "@web-core";
import { useState } from "react";

const FrontCamera = ({ borderRadius }: { borderRadius?: number }) => {
  const [cameraReady, setCameraReady] = useState(false);

  commonHooks.useAsyncEffect(async () => {
    const mediaStream = await MediaDeviceManager.getMediaStream();
    const _video = document.querySelector(WEBSITE_CONSTS.CAMERA_VIDEO_QUERY);
    const video = _video as HTMLVideoElement;
    video.srcObject = mediaStream;

    setCameraReady(true);
  }, []);

  return (
    <Flex
      direction={"column"}
      w="100%"
      h={"100%"}
      position={"relative"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <video
        autoPlay
        disableRemotePlayback
        disablePictureInPicture
        width={"100%"}
        id="videoElement"
        style={{
          objectFit: "contain",
          transform: "rotateY(180deg)",
          borderRadius,
        }}
        muted
        controls={false}
        playsInline
      />

      {!cameraReady && (
        <Flex
          w={"100%"}
          h={"100%"}
          alignItems="center"
          justifyContent="center"
          position={"absolute"}
          flex={1}
        >
          <Text type="Body2_Normal" color="Material/Dimmer" textAlign="center">
            카메라 조정중 ...
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default FrontCamera;
