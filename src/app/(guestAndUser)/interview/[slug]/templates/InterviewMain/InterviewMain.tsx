"use client";

import { Flex } from "@uis";
import { useEffect, useRef, useState } from "react";

import { EventLogger } from "@components";
import ChatSection from "../../../components/ChatSection";
import { CircleButtonProps } from "../../../components/CircleButton";
import EndPopup from "../../../components/EndPopup";
import ExitPopup from "../../../components/ExitPopup";
import ForcedEndPopup from "../../../components/ForcedEndPopup";
import { FrontCameraRef } from "../../../components/FrontCamera";
import TopBar from "../../../components/TopBar";
import InterviewStatusWithTimerProvider, {
  InterviewStatusSwitch,
} from "./contexts/InterviewStatusWithTimerProvider";

const InterviewScreen = () => {
  const [setting, setSetting] = useState({
    mic: true,
    video: true,
    chat: true,
  });

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
    <InterviewStatusWithTimerProvider>
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
          {setting.chat && <ChatSection />}
        </Flex>

        <InterviewStatusSwitch status="END">
          <EndPopup />
        </InterviewStatusSwitch>

        <InterviewStatusSwitch status="FORCED_END">
          <ForcedEndPopup />
        </InterviewStatusSwitch>

        {showExitPopup && (
          <ExitPopup closePopup={() => setShowExitPopup(false)} />
        )}
      </Flex>
    </InterviewStatusWithTimerProvider>
  );
};

export default InterviewScreen;
