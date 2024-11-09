import { INTERVIEW_CONSTS } from "@constants";
import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";
import { useInterviewQuestionsContext } from "../../../contexts/InterviewQuestionsContext";

const QuestionProgressParts = () => {
  const {
    processStats: { statsByType },
  } = useInterviewQuestionsContext();
  const typesSortedByOrder: InterviewTypes.QuestionType[] = [
    "introduce",
    "personal",
    "tech",
    "behavior",
  ];
  return (
    <Flex w="100%" flexDir={"column"} alignItems={"center"}>
      <Text type={"Title2"} fontWeight={"500"}>
        면접 순서를 확인해주세요
      </Text>
      <Flex direction={"column"} gap={10} mt={24} mb={96} w="100%">
        {typesSortedByOrder.map((type, index) => (
          <PartRow
            index={index}
            durationInMinutes={statsByType[type].durationInMinutes}
            numberOfQuestions={statsByType[type].numberOfQuestions}
            name={INTERVIEW_CONSTS.QUESTION_TYPE_LABEL[type]}
            key={type}
          />
        ))}
      </Flex>
    </Flex>
  );
};

const PartRow = (props: {
  index: number;
  name: string;
  durationInMinutes: number;
  numberOfQuestions: number;
}) => {
  const { index, name, durationInMinutes, numberOfQuestions } = props;
  return (
    <Flex
      bgColor={"Fill/Normal"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={8}
      borderRadius={8}
      h={45}
    >
      <Flex alignItems={"center"}>
        <Text
          type="Body1_Normal"
          fontWeight={"600"}
          color="Label/Normal"
        >{`Part ${index}`}</Text>
        <Text
          type="Body1_Normal"
          fontWeight={"600"}
          color="Label/Alternative"
          ml={24}
        >
          {name}
        </Text>
      </Flex>

      <Flex alignItems={"center"}>
        <Text
          type="Body1_Normal"
          fontWeight={"600"}
          color="Label/Assistive"
        >{`${numberOfQuestions}개 / ${durationInMinutes}분`}</Text>
      </Flex>
    </Flex>
  );
};

export default QuestionProgressParts;
