"use client";

import { EventLogger } from "@components";
import { useInterviewDetailSettingQueryById } from "@hooks";
import { queryOptions } from "@queries";
import { useQuery } from "@tanstack/react-query";
import assert from "assert";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import InterviewStepRenderer from "../components/InterviewStepRenderer";
import QuestionWaiting, {
  QuestionWaitingRef,
} from "../components/QuestionWaiting";
import InterviewDetailSettingProvider from "../InterviewDetailSettingContext";
import {} from "../utils";

const STEPS = [
  "1_QUESTION_WAITING",
  "2_STEP_CHECK",
  "3_SETTING_CHECK",
  "4_ENTER_WAITING",
  "5_INTERVIEW",
] as const;

type Step = (typeof STEPS)[number];

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

  const handleLoadingEnd = useCallback(async () => {
    await questionWaitingRef.current?.animStart();
    setShowLoading(false);
  }, []);

  useEffect(() => {
    if (hasAllRequiredData) handleLoadingEnd();
  }, [hasAllRequiredData, handleLoadingEnd]);

  useEffect(() => {
    EventLogger.log("InterviewSettingLoading");
  }, []);

  useEffect(() => {
    if (detailSettingQuery.isError || questionsQuery.isError) {
      router.back();
    }
  }, [detailSettingQuery.isError, questionsQuery.isError, router]);

  if (showLoading) return <QuestionWaiting ref={questionWaitingRef} />;
  assert(detailSettingQuery.data);

  return (
    <InterviewDetailSettingProvider
      interviewDetailSetting={detailSettingQuery.data}
    >
      <InterviewStepRenderer />
    </InterviewDetailSettingProvider>
  );
};
export default Interview;
