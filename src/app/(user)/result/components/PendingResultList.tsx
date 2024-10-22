"use client";

import { Spinner } from "@components";
import { queryOptions } from "@queries";
import { useQuery } from "@tanstack/react-query";
import { Flex, Text } from "@uis";
import { Suspense } from "react";
import { findCompanyInfo } from "../utils";
import PendingResultCard from "./PendingResultCard";

const PendingResultListComponent = () => {
  const { data: userData } = useQuery(queryOptions.userQueryOptions);
  const { data: companyData } = useQuery(queryOptions.companyDeptOptions);

  if (!userData || !userData.result.pending.length)
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
      {userData.result.pending.map((result) =>
        companyData ? (
          <PendingResultCard
            result={result}
            interviewInfo={findCompanyInfo(result, companyData)}
            key={result.interviewId}
          />
        ) : (
          <></>
        )
      )}
    </Flex>
  );
};

export default function PendingResultList() {
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
}
