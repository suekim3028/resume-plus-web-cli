import { EventLogger, Icon, Spinner } from "@components";
import { VideoAndAudioRecorder } from "@libs";
import { Button, Flex, Text } from "@uis";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

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

  const connectMediaStreamToVideo = useCallback((mediaStream: MediaStream) => {
    if (!videoElement.current) return;
    videoElement.current.srcObject = mediaStream;
  }, []);

  // MEMO: useRef의 초기값으로 생성 막을 수 없음 https://react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents
  // 여기선 argument를 받는 생성자가 필요하기 때문에 useState 아닌 useMemo사용함

  const recorder = useMemo<VideoAndAudioRecorder>(() => {
    return new VideoAndAudioRecorder(onRecorderLoadEnd, onRecord);
  }, [onRecorderLoadEnd, onRecord]);

  const record = () => {
    setRecordingStatus("RECORDING");
    recorder.startRecording();
  };

  const stopRecording = () => {
    recorder.stopRecordingAndDestroy();
    if (videoElement.current) videoElement.current.srcObject = null;
  };

  useEffect(() => {
    EventLogger.log(
      recordingStatus === "READY" ? "EnvironmentCheck02" : "EnvironmentCheck03"
    );
  }, [recordingStatus]);

  useEffect(() => {
    return recorder.stopRecordingAndDestroy;
  }, []);

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

export default memo(RecordingStatus);
