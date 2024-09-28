"use client";

import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";
import { useRouter } from "next/navigation";

import { CompanyThumbnail, EventLogger } from "@components";

import { interviewUtils } from "@utils";
import { getScoreStat } from "../utils";
import ScoreBadge from "./ScoreBadge";

const CompletedResultCard = ({
  result,
  interviewInfo,
  createdAt,
}: {
  result: InterviewTypes.CompletedInterviewResult;
  interviewInfo: InterviewTypes.InterviewInfo;
  createdAt: string;
}) => {
  const router = useRouter();

  const { totalMean } = getScoreStat(result);

  return (
    <Flex
      pt={32}
      px={16}
      pb={24}
      direction={"column"}
      flexShrink={0}
      w={282}
      borderRadius={12}
      border={`2px solid rgba(112, 115, 124, 0.52)`}
      onClick={() => {
        router.push(`/result/${interviewInfo.interviewId}`);
        EventLogger.log("interview_result_card", {
          corp_name: interviewInfo.company,
          interview_datetime: createdAt,
          job_name: interviewInfo.job,
          occupation_name: interviewInfo.department,
          score: totalMean,
        });
      }}
      cursor={"pointer"}
    >
      <Flex w="100%" flex={0} h={128} mb={16}>
        <CompanyThumbnail
          companyName={interviewInfo.company}
          size={"large"}
          imageUrl={interviewInfo.companyThumbnailUrl ?? undefined}
        />
        <Flex
          direction={"column"}
          h={128}
          flex={1}
          pl={8}
          justifyContent={"center"}
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
        >
          <Text
            type="Body1_Normal"
            lineHeight={"100%"}
            fontWeight={"700"}
            mb={12}
            wordBreak={"break-all"}
            width={"100%"}
          >
            {interviewInfo.company}
          </Text>

          <Text
            type="Body1_Normal"
            lineHeight={"100%"}
            fontWeight={"400"}
            width={"100%"}
            wordBreak={"break-all"}
            mb={4}
          >
            {interviewInfo.department}
          </Text>

          <Text
            type="Body1_Normal"
            width={"100%"}
            lineHeight={"100%"}
            wordBreak={"break-all"}
            fontWeight={"400"}
          >
            {interviewInfo.job}
          </Text>
        </Flex>
      </Flex>
      <Flex w="100%" justifyContent={"space-between"} alignItems={"center"}>
        <Text type="Label2" fontWeight={"400"}>
          {interviewUtils.formatData(result.createdAt)}
        </Text>
        <ScoreBadge score={totalMean} size={"medium"} />
      </Flex>
    </Flex>
  );
};

export default CompletedResultCard;
