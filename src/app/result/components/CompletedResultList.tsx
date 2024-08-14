"use client";

import { useCompanyData, useResult } from "@atoms";
import { Spinner } from "@chakra-ui/react";
import { Flex } from "@uis";
import { Suspense } from "react";
import { findCompanyInfo } from "../utils";
import CompletedResultCard from "./CompletedResultCard";

const CompletedResultListComponent = () => {
  const { done } = useResult();
  const companyData = useCompanyData();

  return (
    <Flex w="100%" overflowX={"scroll"} gap={24} pb={24}>
      {done.map((result) => (
        <CompletedResultCard
          result={result}
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
          <Spinner />
        </Flex>
      }
    >
      <CompletedResultListComponent />
    </Suspense>
  );
}
