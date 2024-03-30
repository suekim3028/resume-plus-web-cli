import { Progress, Stack, Text } from "@chakra-ui/react";
import { useStepContext } from "@contexts";
import { questionAllLoadedStore } from "@store";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Font, Layout as L } from "@design-system";
const QuestionLoading = () => {
  console.log("!!!!!!!!!!!!!!");
  const { goNext } = useStepContext();
  const questionsAllLoaded = useRecoilValue(questionAllLoadedStore);
  console.log({ questionsAllLoaded });

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (questionsAllLoaded) {
      // goNext();
    }
  }, [questionsAllLoaded, goNext]);

  return (
    <L.FlexCol>
      <Font.Display type="28_bold_multi">??</Font.Display>
    </L.FlexCol>
  );
  return (
    <Stack direction={"column"}>
      <Text>김팔자님의 레쥬메 바탕으로 질문을 만들고 있어요!</Text>
      {showLoader ? <Progress size="xs" isIndeterminate /> : <></>}
    </Stack>
  );
};

export default QuestionLoading;
