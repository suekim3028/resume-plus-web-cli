"use client";
import { companyDataStore } from "@store";
import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { getScoreStat } from "../utils";
import ScoreBadge from "./ScoreBadge";

const CompletedResultCard = (
  result: InterviewTypes.CompletedInterviewResult
) => {
  const router = useRouter();
  const companyData = useRecoilValue(companyDataStore);
  const { companyId, jobId, departmentId, createdAt, interviewId } = result;

  const company = companyData?.companies.find(
    ({ companyId: id }) => id === companyId
  );
  const department = companyData?.departments.find(
    ({ companyDeptId: id }) => id === departmentId
  );
  const job = companyData?.jobs.find(({ companyJobId: id }) => id === jobId);
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
        router.push(`/result/${interviewId}`);
      }}
    >
      <Flex w="100%" flex={0} h={128} mb={14}>
        <Flex
          w={128}
          h={128}
          flexShrink={0}
          rounded={10}
          bgRgbColor="rgba(217, 217, 217, 1)"
        ></Flex>
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
            {company?.companyName || ""}
          </Text>

          <Text
            type="Body1_Normal"
            lineHeight={"100%"}
            fontWeight={"400"}
            width={"100%"}
            wordBreak={"break-all"}
            mb={4}
          >
            {department?.companyDept || ""}
          </Text>

          <Text
            type="Body1_Normal"
            width={"100%"}
            lineHeight={"100%"}
            wordBreak={"break-all"}
            fontWeight={"400"}
          >
            {job?.companyJob || ""}
          </Text>
        </Flex>
      </Flex>
      <Flex w="100%" justifyContent={"space-between"}>
        <Text type="Label2" fontWeight={"400"}>
          {createdAt}
        </Text>
        <ScoreBadge score={totalMean} size={"medium"} />
      </Flex>
    </Flex>
  );
};

export default CompletedResultCard;
