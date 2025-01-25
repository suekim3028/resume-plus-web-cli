"use client";

import { useCompanyData, useResult } from "@atoms";
import { Spinner } from "@components";
import { Flex, Text } from "@uis";
import { Suspense } from "react";
import { findCompanyInfo } from "../utils";
import PendingResultCard from "./PendingResultCard";

const PendingResultListComponent = () => {
  const { pending } = useResult();
  const companyData = useCompanyData();

  if (!pending.length)
    return (
      <Flex pt={48} w={"100%"} flexDir={"column"} alignItems={"center"}>
        <Text
          textAlign={"center"}
          color={"Label/Alternative"}
          type={"Heading1"}
          fontWeight={"500"}
        >
          {"분석중인 면접이 없습니다"}
        </Text>
      </Flex>
    );

  return (
    <Flex w="100%" overflowX={"scroll"} gap={24} pb={24}>
      {pending.map((result) => (
        <PendingResultCard
          result={result}
          interviewInfo={findCompanyInfo(result, companyData)}
          key={result.interviewId}
        />
      ))}
    </Flex>
  );
};

const PendingResultList = () => {
  return (
    <Suspense
      fallback={
        <Flex w="100%" p={24}>
          <Spinner size={40} />
        </Flex>
      }
    >
      <PendingResultListComponent />
    </Suspense>
  );
};

export default PendingResultList;
