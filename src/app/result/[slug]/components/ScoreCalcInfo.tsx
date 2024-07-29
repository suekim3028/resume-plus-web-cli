import { Icon } from "@components";
import { Flex, Text } from "@uis";

const ScoreCalcInfo = () => {
  return (
    <Flex
      bgColor={"Fill/Strong"}
      borderRadius={12}
      py={16}
      pl={8}
      pr={18}
      direction={"column"}
    >
      <Flex gap={4} alignItems={"center"}>
        <Icon name={"normalCircleQuestion"} size={16} />
        <Text type={"Caption1"} fontWeight={"600"}>
          점수는 어떻게 측정되나요?
        </Text>
      </Flex>
      <Text type={"Caption2"} fontWeight={"400"} mt={8}>
        우선 기준에 따라 저희 모델을 통해 답변을 채점해서 기준 별 점수를
        산출해요. 그 뒤 답변의 종합 점수로 기준 별로 평가된 점수의 평균을
        사용했어요. 이러한 답변 점수의 평균을 파트의 점수로 나타냈어요.
        마지막으로 파트 별 점수의 평균을 면접 전체 점수로 사용했어요.
      </Text>
    </Flex>
  );
};

export default ScoreCalcInfo;
