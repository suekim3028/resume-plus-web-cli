"use client";

import { useResult } from "@atoms";
import { Flex } from "@uis";
import { Suspense } from "react";
import CompletedResultCard from "./CompletedResultCard";

const CompletedResultListComponent = () => {
  const { done } = useResult();

  return (
    <Flex w="100%" overflowX={"scroll"} gap={24} pb={24}>
      {done.map((result) => (
        <CompletedResultCard {...result} key={result.interviewId} />
      ))}
    </Flex>
  );
};

export default function CompletedResultList() {
  return (
    <Suspense fallback={<>로딩중 ..</>}>
      <CompletedResultListComponent />
    </Suspense>
  );
}
