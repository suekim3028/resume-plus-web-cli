"use client";
import { GridItem } from "@chakra-ui/react";
import { Icon } from "@components";

import { Flex, GridWrapper, Text } from "@uis";
import { useRouter } from "next/navigation";

import { useCompanyData, useResult } from "@atoms";
import { getScoreStat } from "../utils";
import FeedbackList from "./components/FeedbackList";
import InterviewInfoCard from "./components/InterviewInfoCard";
import ScoreCalcInfo from "./components/ScoreCalcInfo";

const ResultDetail = ({ params }: { params: { slug: number } }) => {
  const interviewId = params.slug;

  const resultInterviews = useResult();
  const companyData = useCompanyData();
  const router = useRouter();
  const interview = resultInterviews?.done.find((i) => {
    return i.interviewId === Number(interviewId);
  });

  if (!interview) return <></>;

  const { companyId, jobId, departmentId, createdAt } = interview;

  const company = companyData?.companies.find(
    ({ companyId: id }) => id === companyId
  );
  const department = companyData?.departments.find(
    ({ companyDeptId: id }) => id === departmentId
  );
  const job = companyData?.jobs.find(({ companyJobId: id }) => id === jobId);
  const { totalMean } = getScoreStat(interview);

  return (
    <Flex flexDir={"column"} alignItems={"center"} w="100%">
      <GridWrapper>
        <GridItem colSpan={2}>
          <Flex gap={4} my={60} onClick={router.back}>
            <Icon name="normalArrowLeft" size={16} />
            <Text
              type={"Label1_Normal"}
              color={"Label/Alternative"}
              fontWeight={"600"}
            >
              목록으로 돌아가기
            </Text>
          </Flex>
        </GridItem>
      </GridWrapper>
      <GridWrapper pb={230}>
        <GridItem colSpan={2}>
          <Flex direction={"column"} w="100%" gap={24}>
            <InterviewInfoCard
              companyName={company?.companyName || ""}
              jobName={job?.companyJob || ""}
              departmentName={department?.companyDept || ""}
              meanScore={totalMean}
              createdAt={createdAt}
            />
            <ScoreCalcInfo />
          </Flex>
        </GridItem>
        <GridItem colSpan={10} colStart={3}>
          <FeedbackList {...interview} />
        </GridItem>
      </GridWrapper>
    </Flex>
  );
};

export default ResultDetail;
