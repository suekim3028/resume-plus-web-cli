import { UI } from "@constants";
import { Flex } from "@uis";
import { commonHooks } from "@web-core";
import React, { RefObject, useMemo } from "react";
import { BOTTOM_BAR_HEIGHT, TOP_BAR_HEIGHT } from "../constants";
import FrontCamera, { FrontCameraRef } from "./FrontCamera";

const CamSection = ({
  chatOn,
  cameraRef,
  talkingSide,
}: {
  chatOn: boolean;
  cameraRef: RefObject<FrontCameraRef>;
  talkingSide: "COMPANY" | "ME" | null;
}) => {
  const window = commonHooks.useWindowSize({});

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
        <FrontCamera ref={cameraRef} />
      </Flex>
    </Flex>
  );
};

const CAM_MT = 88;
const CAM_GAP = 24;
const CAM_MX = 20;

export default React.memo(CamSection);
