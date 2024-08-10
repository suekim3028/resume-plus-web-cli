import { Flex, Text } from "@uis";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const FrontCameraComponent: ForwardRefRenderFunction<
  FrontCameraRef,
  FrontCameraProps
> = ({ borderRadius, muted }, ref) => {
  const [cameraReady, setCameraReady] = useState(false);
  const mediaStream = useRef<MediaStream>();

  const video = useRef<HTMLVideoElement>(null);

  const getFrontCameraStream = async () => {
    const userMedia = await navigator.mediaDevices?.getUserMedia({
      video: {
        facingMode: { ideal: "user" },
      },
      audio: false,
    });

    mediaStream.current = userMedia;
    if (video.current) video.current.srcObject = userMedia;

    setCameraReady(true);
  };

  const stop = async () => {
    if (!mediaStream.current || !video.current) return;

    mediaStream.current.getTracks().forEach((track) => {
      track.stop();
    });

    video.current.srcObject = null;
  };

  useImperativeHandle(ref, () => ({ resume: getFrontCameraStream, stop }));

  const effected = useRef(false);

  useEffect(() => {
    if (effected.current) return;
    effected.current = true;
    getFrontCameraStream();
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
        height={"100%"}
        style={{
          objectFit: "contain",
          transform: "rotateY(180deg)",
          borderRadius,
        }}
        muted
        controls={false}
        playsInline
        ref={video}
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

export type FrontCameraRef = {
  stop: () => void;
  resume: () => void;
};
type FrontCameraProps = {
  borderRadius?: number;
  muted?: boolean;
};
const FrontCamera = forwardRef(FrontCameraComponent);

export default FrontCamera;
