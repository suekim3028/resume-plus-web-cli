import { Tag, TagLabel } from "@chakra-ui/react";
import mediaDeviceManager from "@libs/MediaDeviceManager";
import { commonHooks } from "@web-core";
import { useEffect, useState } from "react";

const Microphone = () => {
  const [micReady, setMicReady] = useState(false);

  commonHooks.useAsyncEffect(async () => {
    await mediaDeviceManager.getMediaStream();
    setMicReady(true);
  }, []);
  return (
    <Tag size="lg" colorScheme={micReady ? "blue" : "red"} borderRadius="full">
      <TagLabel>{micReady ? "마이크 작동 중" : "마이크 로딩중"}</TagLabel>
    </Tag>
  );
};

export default Microphone;
