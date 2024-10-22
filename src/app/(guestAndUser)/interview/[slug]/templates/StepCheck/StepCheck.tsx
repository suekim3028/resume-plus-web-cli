import { EventLogger } from "@components";
import { Button, Flex, Text } from "@uis";
import Container from "../../../components/Container";
import { useInterviewQuestionsContext } from "../../../InterviewQuestionsContext";
import { QuestionPart } from "../../../types";

const StepCheck = ({ goNext }: { goNext: () => void }) => {
  const { questions } = useInterviewQuestionsContext();

  const totalDuration = questionParts.reduce((prev, current) => {
    return prev + current.duration;
  }, 0);

  return (
    <Container colSpan={8} colStart={3}>
      <Flex>
        <Text type={"Title2"} fontWeight={"500"} color={"Static/Black"}>
          {`총`}
        </Text>
        <Text
          type={"Title2"}
          fontWeight={"500"}
          color={"Primary/Normal"}
          ml={8}
        >
          {`${totalQuestionCount}개`}
        </Text>
        <Text type={"Title2"} fontWeight={"500"} ml={8}>
          질문으로
        </Text>
        <Text
          type={"Title2"}
          fontWeight={"500"}
          ml={8}
          color={"Primary/Normal"}
        >
          {`${totalDuration}분`}
        </Text>
        <Text type={"Title2"} fontWeight={"500"}>
          간 면접이 진행될 예정이에요
        </Text>
      </Flex>
      <Text type={"Title2"} fontWeight={"500"}>
        면접 순서를 확인해주세요
      </Text>
      <Flex direction={"column"} gap={10} mt={24} mb={96} w="100%">
        {questionParts.map((part) => (
          <PartRow {...part} key={part.name} />
        ))}
      </Flex>
      <Button
        onClick={() => {
          goNext();

          EventLogger.log(
            "interview_setting_confirm_button",
            `총 ${totalQuestionCount}개 질문으로 ${totalDuration}분간 면접이 진행될 예정이에요`
          );
        }}
        type="Solid_Primary"
        size="Large"
        title="면접 환경 확인하기"
        flexProps={{ width: 384 }}
      />
    </Container>
  );
};

const PartRow = (props: QuestionPart) => {
  const { index, name, duration, questionCount } = props;
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
        >{`${questionCount}개 / ${duration}분`}</Text>
      </Flex>
    </Flex>
  );
};

export default StepCheck;
