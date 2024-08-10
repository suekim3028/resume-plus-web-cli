"use client";
/* eslint-disable jsx-a11y/alt-text */
import { Icon, IconNames } from "@components";
import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";
import { commonHooks } from "@web-core";
import { useMemo, useRef, useState } from "react";

import { UI } from "@constants";
import InterviewContextProvider, {
  useInterviewContext,
} from "../InterviewContext";
import { RandomQuestion } from "../types";
import ChatSection, { ChatRef } from "./ChatSection";
import FrontCamera, { FrontCameraRef } from "./FrontCamera";

const InterviewScreenComponent = ({ interviewInfo }: InterviewScreenProps) => {
  const { company, job, department } = interviewInfo;
  const window = commonHooks.useWindowSize({});

  const [setting, setSetting] = useState({
    mic: true,
    video: true,
    chat: true,
  });

  const { talkingSide } = useInterviewContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const cameraRef = useRef<FrontCameraRef>(null);

  const CAM_SIZE = useMemo(() => {
    if (!window) return 0;

    const height = window.height - BOTTOM_BAR_HEIGHT - TOP_BAR_HEIGHT - CAM_MT;
    const width =
      (window.width * (setting.chat ? 0.75 : 1) - CAM_GAP - CAM_MX * 2) / 2;

    return Math.min(height, width);
  }, [window?.height, window?.width, setting.chat]);

  const buttons: ButtonProps[] = [
    {
      icon: `button_mic_${setting.mic ? "on" : "off"}`,
      onClick: async () => {
        setSetting((p) => ({ ...p, mic: !p.mic }));
      },
    },
    {
      icon: `button_video_${setting.video ? "on" : "off"}`,
      onClick: () => {
        if (setting.video) {
          cameraRef.current?.stop();
        } else {
          cameraRef.current?.resume();
        }
        setSetting((p) => ({ ...p, video: !p.video }));
      },
    },
    {
      icon: `button_chat_${setting.chat ? "on" : "off"}`,
      onClick: () => setSetting((p) => ({ ...p, chat: !p.chat })),
    },
  ];

  const chatRef = useRef<ChatRef>(null);

  return (
    <Flex
      // flex={1}
      position={"fixed"}
      left={0}
      minWidth={1000}
      right={0}
      top={0}
      bottom={0}
      direction="column"
      bgRgbColor={"rgba(131, 131, 132, 1)"}
      // overflow={"hidden"}
    >
      <Flex
        px={16}
        justifyContent={"space-between"}
        bgColor={"Line/Solid/Normal"}
        zIndex={2}
        alignItems={"center"}
      >
        <Flex alignItems={"center"} gap={12}>
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              width={64}
              height={64}
              src={""}
              style={{ width: 64, height: 64 }}
            />
          }
          <Text
            type="Body1_Normal"
            color={"Label/Alternative"}
            fontWeight={"600"}
          >
            {company.companyName}
          </Text>
          <Text
            type="Body1_Normal"
            color={"Label/Alternative"}
            fontWeight={"600"}
          >
            {department.companyDept}
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={16}>
          <Text
            type="Body1_Normal"
            color={"Label/Alternative"}
            fontWeight={"600"}
          >
            {"00:00"}
          </Text>
        </Flex>
      </Flex>
      <Flex flex={1}>
        <Flex
          flex={1}
          px={8}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex
            gap={CAM_GAP}
            flex={1}
            w="100%"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Flex
              width={CAM_SIZE}
              // flex={0}
              height={CAM_SIZE}
              bgRgbColor={"rgba(217, 217, 217, 1)"}
              borderRadius={12}
              border={
                talkingSide === "COMPANY"
                  ? `3px solid ${UI.COLORS["Primary/Normal"]}`
                  : undefined
              }
            ></Flex>
            <Flex
              overflow={"hidden"}
              // flex={0}
              height={CAM_SIZE}
              width={CAM_SIZE}
              border={
                talkingSide === "ME"
                  ? `3px solid ${UI.COLORS["Primary/Normal"]}`
                  : undefined
              }
              bgRgbColor={"rgba(217, 217, 217, 1)"}
              borderRadius={12}
            >
              <FrontCamera muted={setting.mic} ref={cameraRef} />
            </Flex>
          </Flex>
          <Flex h={BOTTOM_BAR_HEIGHT} pt={43} gap={24}>
            {buttons.map((button) => (
              <Button {...button} key={button.icon} />
            ))}
            <Button
              icon="button_exit"
              onClick={() => {
                //
              }}
            />
          </Flex>
        </Flex>
        {setting.chat && <ChatSection answerWithInput={() => {}} />}
      </Flex>
    </Flex>
  );
};

const BOTTOM_BAR_HEIGHT = 148;
const TOP_BAR_HEIGHT = 60;
const CAM_MT = 88;
const CAM_GAP = 24;
const CAM_MX = 20;
const ChatButton = (chat: { isMine: boolean; text: string }) => {};

const Button = ({ icon, onClick }: ButtonProps) => {
  return (
    <Flex
      w={64}
      h={64}
      cursor={"pointer"}
      onClick={onClick}
      borderRadius={32}
      bgRgbColor="rgba(217, 217, 217, 0.2)"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Icon name={icon} size={24} />
    </Flex>
  );
};

type ButtonProps = {
  icon: IconNames;
  onClick: () => void;
};

type InterviewScreenProps = {
  interviewInfo: InterviewTypes.InterviewInfo;
  questions: RandomQuestion[];
};

const InterviewScreen = (props: InterviewScreenProps) => {
  return (
    <InterviewContextProvider questions={props.questions}>
      <InterviewScreenComponent {...props} />
    </InterviewContextProvider>
  );
};
export default InterviewScreen;
