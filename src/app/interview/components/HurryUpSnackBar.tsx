import { Flex, Text } from "@uis";
import { commonHooks } from "@web-core";
import { useState } from "react";

const HurryUpSnackBar = () => {
  const [leftMinutes, setLeftMinutes] = useState(5);

  commonHooks.useEveryMinuteEffect(() => {
    setLeftMinutes((p) => p - 1);
  });

  if (leftMinutes === 0) return <></>;
  return (
    <Flex w="100%" position={"absolute"} top={64} justifyContent={"center"}>
      <Flex bgColor={"Interaction/Inactive"} borderRadius={12} py={8} px={11}>
        <Text type={"Body1_Normal"} color={"Static/White"}>
          {`${leftMinutes}분 후 면접이 강제 종료됩니다. 면접 결과 저장을 위해 면접을 마쳐주세요!`}
        </Text>
      </Flex>
    </Flex>
  );
};

export default HurryUpSnackBar;
