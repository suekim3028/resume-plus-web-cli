"use client";

import { EventLogger } from "@components/EventLogger";
import { Button } from "@uis";

const HomeStartInterviewButton = () => {
  return (
    <Button
      type="Solid_Primary"
      size="Large"
      title={"지금 바로 시작하기"}
      href={"/interview-setting"}
      onClick={() =>
        EventLogger.log("home_main_banner_card", "지금 바로 시작하기")
      }
      flexProps={{ width: 282, height: 80, padding: 0 }}
      textProps={{ fontSize: 25.72, fontWeight: "600" }}
    />
  );
};

export default HomeStartInterviewButton;
