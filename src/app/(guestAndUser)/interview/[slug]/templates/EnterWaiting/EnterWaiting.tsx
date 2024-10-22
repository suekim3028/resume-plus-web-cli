import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";
import { commonHooks } from "@web-core";
import { useState } from "react";
import Container from "../../../components/Container";

const EnterWaiting = ({
  company,
  job,
  department,
  goNext,
  interviewerName,
}: InterviewTypes.InterviewInfo & {
  goNext: () => void;
  interviewerName: string;
}) => {
  const [leftSeconds, setLeftSeconds] = useState(10);

  commonHooks.useSecondEffect(10, (second) => {
    const _leftSeconds = 10 - second - 1;

    setLeftSeconds(_leftSeconds);
    if (_leftSeconds === 0) {
      setTimeout(() => {
        goNext();
      }, 1000);
    }
  });

  return (
    <Container
      colSpan={10}
      colStart={2}
      bgColor="Background/Normal/Alternative"
    >
      <Text type="Display2" fontWeight={"700"} textAlign={"center"}>
        {`${interviewerName}PM 님(호스트)이 곧 귀하를 들어오게 할 것 입니다.\n잠시만 기다려주세요, 면접이 시작됩니다.`}
      </Text>
      <Text
        mt={32}
        type="Title2"
        fontWeight={"500"}
      >{`${company} ${department} 직군 ${job} 인터뷰`}</Text>
      {leftSeconds ? (
        <Flex>
          <Text
            type="Heading2"
            fontWeight={"400"}
            mt={64}
            color={leftSeconds <= 5 ? "Status/Cautionary" : "Static/Black"}
          >
            {leftSeconds}
          </Text>
          <Text type="Heading2" fontWeight={"400"} mt={64}>
            초 후에 입장합니다!
          </Text>
        </Flex>
      ) : (
        <Text type="Heading2" fontWeight={"400"} mt={64}>
          지금 입장합니다!
        </Text>
      )}
    </Container>
  );
};

export default EnterWaiting;
