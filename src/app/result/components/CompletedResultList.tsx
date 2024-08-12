"use client";
import { completedResultStore } from "@store";
import { Flex } from "@uis";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import CompletedResultCard from "./CompletedResultCard";

const CompletedResultListComponent = () => {
  const resultList = useRecoilValue(completedResultStore);

  return (
    <Flex w="100%" overflowX={"scroll"} gap={24} pb={24}>
      {resultList.map((result) => (
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
