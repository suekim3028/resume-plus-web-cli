"use client";

import { useResult } from "@atoms";
import { Flex } from "@uis";
import { Suspense } from "react";
import PendingResultCard from "./PendingResultCard";

const PendingResultListComponent = () => {
  const { pending } = useResult();

  return (
    <Flex w="100%" overflowX={"scroll"} gap={24} pb={24}>
      {pending.map((result) => (
        <PendingResultCard {...result} key={result.interviewId} />
      ))}
    </Flex>
  );
};

export default function PendingResultList() {
  return (
    <Suspense fallback={<>로딩중 ..</>}>
      <PendingResultListComponent />
    </Suspense>
  );
}
