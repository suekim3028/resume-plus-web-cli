import { Icon } from "@components";
import { Flex, Text } from "@uis";

const ScoreCalcInfo = () => {
  return (
    <Flex
      bgColor={"Fill/Strong"}
      borderRadius={12}
      py={16}
      px={13}
      direction={"column"}
    >
      <Flex gap={4} alignItems={"center"}>
        <Icon name={"normalCircleQuestion"} size={16} />
        <Text type={"Caption1"} fontWeight={"600"}>
          점수는 어떻게 평가되나요?
        </Text>
      </Flex>
      <Text type={"Caption2"} fontWeight={"400"} mt={8}>
        {`총 점수는 1)자기소개 및 지원동기, 2) 경력사항 검증, 3) 직무능력 검증, 4) 조직 적합도 검증의 4개 Part별 점수의 평균으로 계산돼요. 각 Part별 점수는 문항별로 설계된 기준에 따라 AI가 평가해 제공해요.`}
      </Text>
    </Flex>
  );
};

export default ScoreCalcInfo;
