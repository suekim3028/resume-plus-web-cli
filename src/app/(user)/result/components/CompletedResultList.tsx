"use client";

import { useCompanyData, useResult } from "@atoms";

import { Spinner } from "@components";
import { Button, Flex, Text } from "@uis";
import { Suspense } from "react";
import { findCompanyInfo } from "../utils";
import CompletedResultCard from "./CompletedResultCard";

const CompletedResultListComponent = () => {
  const { done } = useResult();
  const companyData = useCompanyData();

  if (!done.length)
    return (
      <Flex pt={24} pb={92} w={"100%"} flexDir={"column"} alignItems={"center"}>
        <Text
          textAlign={"center"}
          color={"Label/Alternative"}
          type={"Heading1"}
          fontWeight={"500"}
        >{`아직 완료된 면접이 없습니다.\n지금 바로 면접연습을 시작해보세요!`}</Text>
        <Button
          type={"Solid_Primary"}
          size="Large"
          title="면접 연습하기"
          href="/interview-setting"
          flexProps={{ mt: 32 }}
        />
      </Flex>
    );

  return (
    <Flex w="100%" overflowX={"scroll"} gap={24} pb={24}>
      {done.map((result) => (
        <CompletedResultCard
          result={result}
          createdAt={result.createdAt}
          interviewInfo={findCompanyInfo(result, companyData)}
          key={result.interviewId}
        />
      ))}
    </Flex>
  );
};

export default function CompletedResultList() {
  return (
    <Suspense
      fallback={
        <Flex w="100%" p={24}>
          <Spinner size={40} />
        </Flex>
      }
    >
      <CompletedResultListComponent />
    </Suspense>
  );
}
