import { Flex, Text } from "@uis";
import { useInterviewQuestionsContext } from "../../../contexts/InterviewQuestionsContext";

const TotalQuestionStat = () => {
  const { processStats } = useInterviewQuestionsContext();

  return (
    <Flex>
      <Text type={"Title2"} fontWeight={"500"} color={"Static/Black"}>
        {`총`}
      </Text>
      <Text type={"Title2"} fontWeight={"500"} color={"Primary/Normal"} ml={8}>
        {`${processStats.numberOfQuestions}개`}
      </Text>
      <Text type={"Title2"} fontWeight={"500"} ml={8}>
        질문으로
      </Text>
      <Text type={"Title2"} fontWeight={"500"} ml={8} color={"Primary/Normal"}>
        {`${processStats.durationInMinutes}분`}
      </Text>
      <Text type={"Title2"} fontWeight={"500"}>
        간 면접이 진행될 예정이에요
      </Text>
    </Flex>
  );
};
export default TotalQuestionStat;
