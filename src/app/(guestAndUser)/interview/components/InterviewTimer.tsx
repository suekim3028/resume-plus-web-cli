import { Text } from "@uis";
import { commonHooks } from "@web-core";
import React, { useEffect, useState } from "react";

const TIMEOUT_MINUTES = 60;

const TIMEOUT_SECONDS = TIMEOUT_MINUTES * 60;

const InterviewTimer = ({ onTimeEnd }: { onTimeEnd: () => void }) => {
  const [seconds, setSeconds] = useState(0);

  commonHooks.useEverySecondEffect(() => {
    setSeconds((p) => p + 1);
  });

  useEffect(() => {
    if (seconds === TIMEOUT_SECONDS) {
      onTimeEnd();
    }
  }, [seconds === TIMEOUT_SECONDS]);

  if (seconds >= TIMEOUT_SECONDS) return <></>;
  return (
    <Text type="Body1_Normal" color={"Label/Alternative"} fontWeight={"600"}>
      {`${Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0")} : ${(seconds % 60).toString().padStart(2, "0")}`}
    </Text>
  );
};

export default React.memo(InterviewTimer);
