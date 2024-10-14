"use client";
import { GridItem } from "@chakra-ui/react";
import { EventLogger, Icon } from "@components";

import { Flex, GridWrapper, Text } from "@uis";
import { useRouter } from "next/navigation";

import { queryOptions } from "@queries";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { findCompanyInfo, getScoreStat } from "../utils";
import FeedbackList from "./components/FeedbackList";
import InterviewInfoCard from "./components/InterviewInfoCard";
import ScoreCalcInfo from "./components/ScoreCalcInfo";

const ResultDetail = ({ params }: { params: { slug: number } }) => {
  const interviewId = params.slug;

  const { data: userData } = useQuery(queryOptions.userQueryOptions);
  const { data: companyData } = useQuery(queryOptions.companyDeptOptions);
  const router = useRouter();
  const interview = userData
    ? userData.result.done.find((i) => {
        return i.interviewId === Number(interviewId);
      })
    : null;

  const interviewInfo = useMemo(() => {
    const start = Date.now();
    if (!interview || !companyData) return null;
    const { createdAt } = interview;
    const companyInfo = findCompanyInfo(interview, companyData);
    const { totalMean } = getScoreStat(interview);
    const end = Date.now();
    console.log("계산에 든 시간------", end - start);
    return { ...interview, ...companyInfo, createdAt, totalMean };
  }, [!!interview, !!companyData]);

  useEffect(() => {
    if (!interviewInfo) return;
    const { company, department, job, createdAt, totalMean } = interviewInfo;

    EventLogger.log("InterviewResultDetail", {
      corp_name: company,
      interview_datetime: createdAt,
      job_name: job,
      occupation_name: department,
      score: totalMean,
    });
  }, [!!interviewInfo]);

  if (!interviewInfo || !interview) return <></>;
  const { company, department, job, createdAt, totalMean } = interviewInfo;

  return (
    <Flex flexDir={"column"} alignItems={"center"} w="100%">
      <GridWrapper>
        <GridItem colSpan={2}>
          <Flex gap={4} my={60} onClick={router.back} cursor={"pointer"}>
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
              companyName={company}
              jobName={job}
              departmentName={department}
              meanScore={totalMean}
              createdAt={createdAt}
            />
            <ScoreCalcInfo />
          </Flex>
        </GridItem>
        <GridItem colSpan={10} colStart={3}>
          <FeedbackList
            {...interview}
            companyName={company}
            jobName={job}
            departmentName={department}
            meanScore={totalMean}
            createdAt={createdAt}
          />
        </GridItem>
      </GridWrapper>
    </Flex>
  );
};

export default ResultDetail;
