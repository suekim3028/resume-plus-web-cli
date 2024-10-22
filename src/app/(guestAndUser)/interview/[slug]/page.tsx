"use client";

import { EventLogger } from "@components";
import { useInterviewDetailSettingQueryById } from "@hooks";
import { queryOptions } from "@queries";
import { useQuery } from "@tanstack/react-query";
import assert from "assert";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import QuestionWaiting, {
  QuestionWaitingRef,
} from "../components/QuestionWaiting";
import InterviewDetailSettingProvider from "../InterviewDetailSettingContext";
import InterviewQuestionsContextProvider from "../InterviewQuestionsContext";
import InterviewStepRenderer from "./templates/InterviewStepRenderer";

const Interview = ({ params }: { params: { slug: number } }) => {
  const interviewId = params.slug;
  const router = useRouter();
  const questionWaitingRef = useRef<QuestionWaitingRef>(null);

  const detailSettingQuery = useInterviewDetailSettingQueryById(interviewId);
  const questionsQuery = useQuery(
    queryOptions.genInterviewQuestionsOptions(interviewId)
  );
  const hasAllRequiredData = !!detailSettingQuery.data && !!questionsQuery.data;

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (hasAllRequiredData)
      (async () => {
        await questionWaitingRef.current?.animStart();
        setShowLoading(false);
      })();
  }, [hasAllRequiredData]);

  useEffect(() => {
    EventLogger.log("InterviewSettingLoading");
  }, []);

  useEffect(() => {
    if (detailSettingQuery.isError || questionsQuery.isError) {
      router.back();
    }
  }, [detailSettingQuery.isError, questionsQuery.isError, router]);

  if (showLoading) return <QuestionWaiting ref={questionWaitingRef} />;
  assert(detailSettingQuery.data && questionsQuery.data);

  return (
    <InterviewDetailSettingProvider
      interviewDetailSetting={detailSettingQuery.data}
    >
      <InterviewQuestionsContextProvider questions={questionsQuery.data}>
        <InterviewStepRenderer />
      </InterviewQuestionsContextProvider>
    </InterviewDetailSettingProvider>
  );
};
export default Interview;
