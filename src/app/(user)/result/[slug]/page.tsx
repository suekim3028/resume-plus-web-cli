"use client";
import { GridItem } from "@chakra-ui/react";
import { EventLogger, Icon } from "@components";

import { useCompanyData, useResult } from "@atoms";
import { Flex, GridWrapper, Text } from "@uis";
import { useRouter } from "next/navigation";

import { useEffect, useMemo } from "react";
import { getScoreStat } from "../utils";
import FeedbackList from "./components/FeedbackList";
import InterviewInfoCard from "./components/InterviewInfoCard";
import ScoreCalcInfo from "./components/ScoreCalcInfo";

const ResultDetail = ({ params }: { params: { slug: number } }) => {
  const interviewId = params.slug;

  const resultInterviews = useResult();
  const { getJobsByDepartmentId, ...companyData } = useCompanyData();
  const router = useRouter();
  const interview = resultInterviews?.done.find((i) => {
    return i.interviewId === Number(interviewId);
  });

  const interviewInfo = useMemo(() => {
    if (!interview) return null;
    const { companyId, jobId, departmentId, createdAt } = interview;

    const company = companyData?.companies.find(
      ({ companyId: id }) => id === companyId
    );
    const department = companyData?.departmentGroups.find(
      ({ departmentId: id }) => id === departmentId
    );

    const job = department
      ? getJobsByDepartmentId(department?.departmentId).find(
          ({ companyJobId }) => companyJobId === jobId
        ) || null
      : null;
    const { totalMean } = getScoreStat(interview);

    return { ...interview, company, department, job, createdAt, totalMean };
  }, [!!interview]);

  useEffect(() => {
    if (!interviewInfo) return;
    const { company, department, job, createdAt, totalMean } = interviewInfo;

    EventLogger.log("InterviewResultDetail", {
      corp_name: company?.companyName || "",

      interview_datetime: createdAt,
      job_name: job?.companyJob || "",
      occupation_name: department?.department || "",
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
              companyName={company?.companyName || ""}
              jobName={job?.companyJob || ""}
              departmentName={department?.department || ""}
              meanScore={totalMean}
              createdAt={createdAt}
            />
            <ScoreCalcInfo />
          </Flex>
        </GridItem>
        <GridItem colSpan={10} colStart={3}>
          <FeedbackList
            {...interview}
            companyName={company?.companyName || ""}
            jobName={job?.companyJob || ""}
            departmentName={department?.department || ""}
            meanScore={totalMean}
            createdAt={createdAt}
          />
        </GridItem>
      </GridWrapper>
    </Flex>
  );
};

export default ResultDetail;
