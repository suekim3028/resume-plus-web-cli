"use client";

import { Flex } from "@uis";
import { useEffect, useRef, useState } from "react";

import { EventLogger } from "@components";
import CamSection from "../../../components/CamSection";
import ChatSection from "../../../components/ChatSection";
import CircleButton, {
  CircleButtonProps,
} from "../../../components/CircleButton";
import EndPopup from "../../../components/EndPopup";
import ExitPopup from "../../../components/ExitPopup";
import ForcedEndPopup from "../../../components/ForcedEndPopup";
import { FrontCameraRef } from "../../../components/FrontCamera";
import HurryUpSnackBar from "../../../components/HurryUpSnackBar";
import TopBar from "../../../components/TopBar";
import { BOTTOM_BAR_HEIGHT } from "../../../constants";
import InterviewContextProvider, {
  useInterviewContext,
} from "../../../InterviewContext";
import { useInterviewInfoContext } from "../InterviewInfoContext";

const InterviewScreenComponent = () => {
  const [setting, setSetting] = useState({
    mic: true,
    video: true,
    chat: true,
  });

  const { talkingSide, status } = useInterviewContext();
  const { interviewerName } = useInterviewInfoContext();

  const [showExitPopup, setShowExitPopup] = useState(false);

  const cameraRef = useRef<FrontCameraRef>(null);

  const buttons: CircleButtonProps[] = [
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
      onClick: () => {
        setSetting((p) => ({ ...p, chat: !p.chat }));
        EventLogger.log("interview_chat_button");
      },
    },
  ];

  useEffect(() => {
    return () => {
      cameraRef.current?.stop();
    };
  }, []);

  return (
    <Flex
      position={"fixed"}
      left={0}
      minWidth={1000}
      right={0}
      top={0}
      bottom={0}
      direction="column"
      bgRgbColor={"rgba(131, 131, 132, 1)"}
    >
      <TopBar />
      <Flex flex={1} overflowY={"hidden"}>
        <Flex
          flex={1}
          px={8}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          position={"relative"}
        >
          <CamSection
            micOn={setting.mic}
            interviewerName={interviewerName}
            cameraRef={cameraRef}
            chatOn={setting.chat}
            talkingSide={talkingSide}
          />
          <Flex h={BOTTOM_BAR_HEIGHT} pt={43} gap={24}>
            {buttons.map((button) => (
              <CircleButton {...button} key={button.icon} />
            ))}
            <CircleButton
              icon="button_exit"
              onClick={() => {
                setShowExitPopup(true);
                EventLogger.log("interview_exit_button");
              }}
            />
          </Flex>

          {status === "5_MINUTES_LEFT" && <HurryUpSnackBar />}
        </Flex>
        {setting.chat && <ChatSection />}
      </Flex>
      {status === "END" && <EndPopup />}
      {status === "FORCE_END" && <ForcedEndPopup />}
      {showExitPopup && (
        <ExitPopup closePopup={() => setShowExitPopup(false)} />
      )}
    </Flex>
  );
};

const InterviewScreen = () => {
  return (
    <InterviewContextProvider>
      <InterviewScreenComponent />
    </InterviewContextProvider>
  );
};
export default InterviewScreen;
