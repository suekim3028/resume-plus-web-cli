//
import { EventLogger } from "@components";
import { INTERVIEW_CONSTS, UI } from "@constants";
import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";
import { useState } from "react";
import ScoreBadge from "../../components/ScoreBadge";
import { getScoreStat } from "../../utils";
import FeedbackItem from "./FeedbackItem";

const FeedbackList = (
  interview: Pick<
    InterviewTypes.CompletedInterviewResult,
    | "behaviorFeedback"
    | "introduceFeedback"
    | "personalFeedback"
    | "techFeedback"
  > & {
    createdAt: string;
    companyName: string;
    jobName: string;
    departmentName: string;
    meanScore: number;
  }
) => {
  const [selected, setSelected] =
    useState<InterviewTypes.QuestionType>("introduce");

  const sectionList: InterviewTypes.QuestionType[] = [
    "introduce",
    "personal",
    "tech",
    "behavior",
  ];

  const {
    behaviorFeedback,
    introduceFeedback,
    personalFeedback,
    techFeedback,
    createdAt,
    companyName,
    jobName,
    departmentName,
    meanScore,
  } = interview;
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
    behavior: behaviorFeedback,
    introduce: introduceFeedback,
    personal: personalFeedback,
    tech: techFeedback,
  };

  return (
    <Flex w="100%" direction={"column"}>
      <Flex gap={40} w="100%">
        {sectionList.map((section) => (
          <Flex
            cursor={"pointer"}
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
            minWidth={197}
            alignItems={"center"}
            justifyContent={"space-between"}
            onClick={() => {
              setSelected(section);
              EventLogger.log("interview_result_detail_card", {
                corp_name: companyName,
                interview_datetime: createdAt,
                job_name: jobName,
                occupation_name: departmentName,
                score: meanScore,
                label: section,
              });
            }}
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
