import { useUserValue } from "@atoms";
import { Icon } from "@components";
import { UI } from "@constants";
import { Flex, Text } from "@uis";
import { commonHooks } from "@web-core";
import React, { RefObject, useMemo } from "react";
import { BOTTOM_BAR_HEIGHT, TOP_BAR_HEIGHT } from "../constants";
import FrontCamera, { FrontCameraRef } from "./FrontCamera";

const CamSection = ({
  chatOn,
  micOn,
  cameraRef,
  talkingSide,
  interviewerName,
}: {
  chatOn: boolean;
  micOn: boolean;
  cameraRef: RefObject<FrontCameraRef>;
  talkingSide: "COMPANY" | "ME" | null;
  interviewerName: string;
}) => {
  const window = commonHooks.useWindowSize({});
  const { user } = useUserValue();

  const CAM_SIZE = useMemo(() => {
    if (!window) return 0;

    const height = window.height - BOTTOM_BAR_HEIGHT - TOP_BAR_HEIGHT - CAM_MT;
    const width =
      (window.width * (chatOn ? 0.75 : 1) - CAM_GAP - CAM_MX * 2) / 2;

    return Math.min(height, width);
  }, [window?.height, window?.width, chatOn]);

  return (
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
        position={"relative"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text type={"Display1"} fontWeight={"700"} color={"Static/Black"}>
          {`${interviewerName}PM`}
        </Text>

        <Text
          type={"Label1_Normal"}
          fontWeight={"600"}
          bottom={12}
          right={8}
          position={"absolute"}
          color={"Primary/Normal"}
        >
          {`면접관_${interviewerName}PM`}
        </Text>
      </Flex>
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
        position={"relative"}
      >
        <FrontCamera ref={cameraRef} />
        {!micOn && (
          <Flex position={"absolute"} left={8} bottom={8}>
            <Icon name="iconMicRedOff" size={24} />
          </Flex>
        )}
        <Text
          type={"Label1_Normal"}
          fontWeight={"600"}
          bottom={12}
          right={8}
          position={"absolute"}
          color={"Primary/Normal"}
        >
          {`지원자_${user && user.loginType !== "GUEST" ? user.name : "OO"}님`}
        </Text>
      </Flex>
    </Flex>
  );
};

const CAM_MT = 88;
const CAM_GAP = 24;
const CAM_MX = 20;

export default React.memo(CamSection);
