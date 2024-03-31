import { Button, Stack, Text } from "@chakra-ui/react";
import { useStepContext } from "@contexts";

const QuestionReady = () => {
  const { goNext } = useStepContext();
  return (
    <Stack direction={"column"}>
      <Text fontSize="xl">질문 생성이 완료되었어요!</Text>
      <Button onClick={goNext}>면접 시작</Button>
    </Stack>
  );
};

export default QuestionReady;
