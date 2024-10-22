"use client";
import { InterviewTypes } from "@types";
import { createContext, ReactNode, useContext } from "react";

const InterviewDetailSetting =
  createContext<InterviewTypes.InterviewDetailSetting | null>(null);

const InterviewDetailSettingProvider = ({
  interviewDetailSetting,
  children,
}: {
  children: ReactNode;
  interviewDetailSetting: InterviewTypes.InterviewDetailSetting;
}) => {
  return (
    <InterviewDetailSetting.Provider value={interviewDetailSetting}>
      {children}
    </InterviewDetailSetting.Provider>
  );
};

export const useInterviewDetailSetting = () => {
  const context = useContext(InterviewDetailSetting);

  if (!context) throw new Error();
  return context;
};

export default InterviewDetailSettingProvider;
