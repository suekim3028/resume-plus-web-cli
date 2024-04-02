import { Stack, Text } from "@chakra-ui/react";
import { useStepContext } from "@contexts";
import { commonHooks, jsUtils } from "@web-core";
import { useEffect, useMemo, useState } from "react";

const InterviewLoading = () => {
  const [leftSeconds, setLeftSeconds] = useState(10);
  const { goNext } = useStepContext();
  commonHooks.useSecondEffect(10, (second) => {
    const _leftSeconds = 10 - second - 1;

    setLeftSeconds(_leftSeconds);
    if (_leftSeconds === 0) {
      goNext();
    }
  });

  const RANDOM_FAMILY_NAME = useMemo(
    () => jsUtils.getRandomArrItem(["김", "이", "박", "정"]),
    []
  );
  return (
    <Stack>
      <Text>
        {RANDOM_FAMILY_NAME} PM 님( 호스트) 이 곧 귀하를 들어오게 할 것 입니다.
        잠시만 기다려주세요, 면접이 시작됩니다.
      </Text>
      <Text>{leftSeconds}</Text>
    </Stack>
  );
};

export default InterviewLoading;
