import { EventLogger, Icon, Spinner } from "@components";
import { VideoAndAudioRecorder } from "@libs";
import { Button, Flex, Text } from "@uis";
import { useCallback, useEffect, useRef, useState } from "react";

const RecordingStatus = ({ onRecord }: { onRecord: (url: string) => void }) => {
  const [recordingStatus, setRecordingStatus] = useState<"READY" | "RECORDING">(
    "READY"
  );
  const [showRecorder, setShowRecorder] = useState({
    video: false,
    mic: false,
  });

  const videoElement = useRef<HTMLVideoElement>(null);

  const onRecorderLoadEnd = useCallback((mediaStream: MediaStream) => {
    connectMediaStreamToVideo(mediaStream);
    setShowRecorder({
      video: !!mediaStream.getVideoTracks().length,
      mic: !!mediaStream.getAudioTracks().length,
    });
  }, []);

  const recorder = useRef<VideoAndAudioRecorder>(
    new VideoAndAudioRecorder(onRecorderLoadEnd, onRecord)
  );

  const connectMediaStreamToVideo = useCallback((mediaStream: MediaStream) => {
    if (!videoElement.current) return;
    videoElement.current.srcObject = mediaStream;
  }, []);

  const record = () => {
    setRecordingStatus("RECORDING");
    recorder.current.startRecording();
  };

  const stopRecording = () => {
    recorder.current.stopRecordingAndDestroy();
  };

  useEffect(() => {
    EventLogger.log(
      recordingStatus === "READY" ? "EnvironmentCheck02" : "EnvironmentCheck03"
    );
  }, [recordingStatus]);

  return (
    <Flex
      direction={"row"}
      h={580}
      alignItems={"center"}
      justifyContent={"center"}
      gap={72}
    >
      <Flex
        alignSelf={"center"}
        width={384}
        height={384}
        borderRadius={28}
        overflow={"hidden"}
        bgColor={showRecorder.video ? "Static/Black" : "Line/Solid/Alternative"}
        position={"relative"}
      >
        <video
          autoPlay
          disableRemotePlayback
          disablePictureInPicture
          width={"100%"}
          height={"100%"}
          ref={videoElement}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: "rotateY(180deg)",

            overflow: "hidden",
          }}
          muted
          controls={false}
          playsInline
        />
        <Flex position={"absolute"} right={16} bottom={16}>
          <Icon
            name={showRecorder.mic ? "iconMicGreen" : "iconMicGreenOff"}
            size={24}
          />
        </Flex>

        {!showRecorder.video && (
          <Flex
            position={"absolute"}
            left={0}
            right={0}
            top={0}
            bottom={0}
            alignItems={"center"}
            justifyContent={"center"}
            bgColor={"Line/Solid/Alternative"}
          >
            <Spinner size={30} />
          </Flex>
        )}
      </Flex>
      {recordingStatus === "READY" ? (
        <Flex direction={"column"} alignItems={"center"}>
          <Text type="Title3" fontWeight={"500"} color="Static/Black">
            준비가 되시면 아래 버튼을 클릭해주세요
          </Text>
          <Text
            type="Headline2"
            fontWeight={"400"}
            color="Label/Strong"
            my={64}
          >
            {`화면을 응시하며 “안녕하세요, 잘 부탁드립니다" 라고 말씀해주세요`}
          </Text>
          <Button
            size={"Large"}
            disabled={!showRecorder.mic || !showRecorder.video}
            title="환경체크 시작"
            type="Solid_Primary"
            onClick={record}
          />
        </Flex>
      ) : (
        <Flex direction={"column"} alignItems={"center"}>
          <Text
            type="Headline2"
            fontWeight={"400"}
            color="Label/Strong"
            mb={64}
          >
            {`화면을 응시하며 “안녕하세요, 잘 부탁드립니다" 라고 말씀해주세요`}
          </Text>
          <Button
            size={"Large"}
            title="점검 완료"
            type="Outlined_Primary"
            onClick={stopRecording}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default RecordingStatus;
