import { Text } from "@uis";
import React, { useEffect, useState } from "react";
import { useInterviewStatusWithTimerContext } from "../[slug]/templates/InterviewMain/contexts/InterviewStatusWithTimerProvider";

const TIMEOUT_MINUTES = 60;

const InterviewTimer = () => {
  const [leftSecondsStr, setLeftSecondsStr] = useState("");
  const { addSecondTimerListener } = useInterviewStatusWithTimerContext();

  useEffect(() => {
    const sub = addSecondTimerListener((seconds) =>
      setLeftSecondsStr(
        `${Math.floor(seconds / 60)
          .toString()
          .padStart(2, "0")} : ${(seconds % 60).toString().padStart(2, "0")}`
      )
    );

    return () => sub.unsubscribe();
  }, []);

  return (
    <Text type="Body1_Normal" color={"Label/Alternative"} fontWeight={"600"}>
      {leftSecondsStr}
    </Text>
  );
};

export default React.memo(InterviewTimer);
