"use client";
import { pendingResultStore } from "@store";
import { Flex } from "@uis";
import { ErrorBoundary } from "@web-core";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import PendingResultCard from "./PendingResultCard";

const PendingResultListComponent = () => {
  const resultList = useRecoilValue(pendingResultStore);

  return (
    <Flex w="100%" overflowX={"scroll"} gap={24} pb={24}>
      {resultList.map((result) => (
        <PendingResultCard {...result} key={result.interviewId} />
      ))}
    </Flex>
  );
};

export default function PendingResultList() {
  return (
    <ErrorBoundary fallback={<>에러!</>}>
      <Suspense fallback={<>로딩중 ..</>}>
        <PendingResultListComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
