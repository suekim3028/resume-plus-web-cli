"use client";
import { queryUtils } from "@queries";
import { Flex } from "@uis";
import { ReactNode } from "react";

const InterviewPrefetchWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      flex={0}
      onMouseEnter={queryUtils.prefetchInterviewSetting}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {children}
    </Flex>
  );
};

export default InterviewPrefetchWrapper;
