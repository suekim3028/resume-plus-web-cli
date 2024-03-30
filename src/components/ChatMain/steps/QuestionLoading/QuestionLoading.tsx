import { Progress, Stack, Text } from "@chakra-ui/react";
import { useStepContext } from "@contexts";
import { interviewQuestionsStore } from "@store";
import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";

const QuestionLoading = () => {
  console.log("!!!!!!!!!!!!!!");
  const { goNext } = useStepContext();
  const interviewQuestionsLoadable = useRecoilValueLoadable(
    interviewQuestionsStore
  );

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (interviewQuestionsLoadable.state === "hasValue") {
      goNext();
    }
  }, [interviewQuestionsLoadable.state, goNext]);

  return (
    <Stack direction={"column"}>
      <Text>김팔자님의 레쥬메 바탕으로 질문을 만들고 있어요!</Text>
      {showLoader ? <Progress size="xs" isIndeterminate /> : <></>}
    </Stack>
  );
};

export default QuestionLoading;
