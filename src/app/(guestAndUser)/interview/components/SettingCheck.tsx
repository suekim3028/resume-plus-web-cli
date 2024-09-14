import { Icon, Spinner } from "@components";
import { Button, Flex, Text } from "@uis";
import { commonHooks } from "@web-core";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";

type Status = "IDLE" | "RECORDING" | "RECORDED";
const SettingCheck = ({ goNext }: { goNext: () => void }) => {
  const [settingStatus, setSettingStatus] = useState<Status>("IDLE");
  const videoUrl = useRef<string | null>(null);

  const render = (): JSX.Element => {
    switch (settingStatus) {
      case "IDLE":
        return <Idle goNext={() => setSettingStatus("RECORDING")} />;
      case "RECORDING":
        return (
          <Recorder
            onRecord={(url) => {
              videoUrl.current = url;
              setSettingStatus("RECORDED");
            }}
          />
        );
      case "RECORDED":
        return (
          <Recorded
            url={videoUrl.current || ""}
            goBack={() => setSettingStatus("RECORDING")}
            goNext={goNext}
          />
        );
    }
  };

  return (
    <Container
      colSpan={10}
      colStart={2}
      bgColor="Background/Normal/Alternative"
    >
      <Flex
        w="100%"
        borderRadius={32}
        bgColor={"Static/White"}
        border={"4px solid rgba(225, 226, 228, 1)"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {render()}
      </Flex>
    </Container>
  );
};

const Idle = ({ goNext }: { goNext: () => void }) => {
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      h={580}
      justifyContent={"center"}
    >
      <Text type="Title3" color="Static/Black" fontWeight={"500"} mb={64}>
        원활한 면접을 위해 웹캠과 마이크 환경을 점검할게요
      </Text>
      <Button
        type="Solid_Primary"
        title="다음"
        onClick={goNext}
        size="Large"
        flexProps={{ width: 228 }}
      />
    </Flex>
  );
};

const Recorder = ({ onRecord }: { onRecord: (url: string) => void }) => {
  const [recordingStatus, setRecordingStatus] = useState<"READY" | "RECORDING">(
    "READY"
  );

  const mediaStream = useRef<MediaStream>();
  const recorder = useRef<MediaRecorder>();
  const videoElement = useRef<HTMLVideoElement>(null);

  const [showRecorder, setShowRecorder] = useState({
    video: false,
    mic: false,
  });

  const record = () => {
    if (!mediaStream.current || !recorder.current) return;
    setRecordingStatus("RECORDING");
    recorder.current.start();
  };

  const stopRecording = () => {
    recorder.current?.stop();
  };

  commonHooks.useAsyncEffect(async () => {
    mediaStream.current = await navigator.mediaDevices?.getUserMedia({
      video: {
        facingMode: { ideal: "user" },
      },
      audio: true,
    });

    if (videoElement.current)
      videoElement.current.srcObject = mediaStream.current;
    setShowRecorder({
      video: mediaStream.current.getVideoTracks().length > 0,
      mic: mediaStream.current.getAudioTracks().length > 0,
    });

    recorder.current = new MediaRecorder(mediaStream.current);
    recorder.current.ondataavailable = (ev) => {
      if (ev.data.size <= 0) return;
      const blob = new Blob([ev.data], {
        type: "video/webm",
      });

      const url = window.URL.createObjectURL(blob);
      onRecord(url);
    };
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
        bgColor={"Static/Black"}
        position={"relative"}
      >
        {showRecorder.video ? (
          <>
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
                borderRadius: 28,
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
          </>
        ) : (
          <Flex
            flex={1}
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

const Recorded = ({
  url,
  goBack,
  goNext,
}: {
  url: string;
  goBack: () => void;
  goNext: () => void;
}) => {
  useEffect(() => {
    if (!url) goBack();
  }, [!!url]);
  return (
    <Flex alignItems={"center"} h={580} w="100%" justifyContent={"center"}>
      <Flex
        flexGrow={0}
        alignSelf={"center"}
        justifyContent={"center"}
        width={384}
        height={384}
        borderRadius={28}
        bgColor={"Static/Black"}
      >
        <video
          src={url}
          autoPlay
          disableRemotePlayback
          disablePictureInPicture
          width={"100%"}
          height={"100%"}
          style={{
            objectFit: "contain",
            transform: "rotateY(180deg)",
            borderRadius: 28,
          }}
          controls={false}
          loop
          playsInline
        />
      </Flex>
      <Flex direction={"column"} alignItems={"center"} ml={90}>
        <Text type="Title3" fontWeight={"500"} color="Static/Black">
          면접 환경 체크가 완료되었어요!
        </Text>
        <Text type="Headline2" fontWeight={"400"} color="Label/Strong" my={64}>
          {`영상이 정상 녹화되었는지 확인해주세요.\n문제가 없다면 면접장으로입장해주세요!`}
        </Text>
        <Flex gap={16}>
          <Button
            size={"Large"}
            title="다시하기"
            type="Outlined_Primary"
            onClick={goBack}
          />
          <Button
            size={"Large"}
            title="입장하기"
            type="Solid_Primary"
            onClick={goNext}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SettingCheck;
