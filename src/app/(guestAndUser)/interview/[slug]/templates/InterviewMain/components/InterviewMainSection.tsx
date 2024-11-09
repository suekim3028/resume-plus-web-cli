import { Flex } from "@uis";
import CamSection from "./CamSection";

const InterviewMainSection = () => {
  return (
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
  );
};
