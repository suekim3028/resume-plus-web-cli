import ScoreBadge from "@app/result/components/ScoreBadge";
import { getScoreStat } from "@app/result/utils";
import { INTERVIEW_CONSTS, UI } from "@constants";
import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";
import { useState } from "react";
import FeedbackItem from "./FeedbackItem";

const FeedbackList = (
  interview: Pick<
    InterviewTypes.CompletedInterviewResult,
    "behavior" | "introduce" | "personal" | "tech"
  >
) => {
  const [selected, setSelected] =
    useState<InterviewTypes.QuestionType>("introduce");

  const sectionList: InterviewTypes.QuestionType[] = [
    "introduce",
    "personal",
    "tech",
    "behavior",
  ];

  const { behavior, introduce, personal, tech } = interview;
  const { behaviorMean, introduceMean, personalMean, techMean } =
    getScoreStat(interview);

  const means: Record<InterviewTypes.QuestionType, number> = {
    behavior: behaviorMean,
    introduce: introduceMean,
    personal: personalMean,
    tech: techMean,
  };

  const answers: Record<
    InterviewTypes.QuestionType,
    InterviewTypes.Feedback[]
  > = {
    behavior: behavior,
    introduce: introduce,
    personal: personal,
    tech: tech,
  };

  return (
    <Flex w="100%" direction={"column"}>
      <Flex gap={40} w="100%">
        {sectionList.map((section) => (
          <Flex
            gap={25}
            borderRadius={12}
            border={`2px solid ${
              UI.COLORS[
                selected === section ? "Primary/Normal" : "Line/Solid/Normal"
              ]
            }`}
            key={section}
            py={16}
            px={8}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => setSelected(section)}
          >
            <Text
              type={"Body1_Normal"}
              fontWeight={selected === section ? "600" : "500"}
            >
              {INTERVIEW_CONSTS.PART_LABEL[section]}
            </Text>
            <ScoreBadge score={means[section]} size={"medium"} />
          </Flex>
        ))}
      </Flex>
      <Flex direction={"column"} w="100%" mt={40} gap={16}>
        {answers[selected].map((answer, index) => (
          <FeedbackItem
            {...{ ...answer, index: index + 1 }}
            key={answer.questionId}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default FeedbackList;
