"use client";
import { EventLogger } from "@components";
import { Button, Flex, Text } from "@uis";

const SurveySection = () => {
  return (
    <Flex direction={"column"} pt={40} alignItems={"center"}>
      <Text
        type={"Heading1"}
        color={"Label/Alternative"}
        fontWeight={"400"}
        pb={16}
        pt={40}
      >
        간단한 설문조사 후에 면접 연습 5회권을 받아가세요!
      </Text>
      <Button
        type={"Outlined_Primary"}
        size="Large"
        title={"설문조사 하기"}
        flexProps={{ width: 180, height: 60, padding: 0 }}
        textProps={{ fontSize: 20, fontWeight: "600" }}
        href={
          "https://docs.google.com/forms/d/e/1FAIpQLSfun86YZZUuyOjeQYUyrXO-yS1kNBPL2DXTKxyThzwQXXxgRg/viewform"
        }
        onClick={() => EventLogger.log("profile_button", "설문조사 하기")}
      />
    </Flex>
  );
};

export default SurveySection;
