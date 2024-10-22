"use client";
import { InterviewTypes } from "@types";
import { createContext, ReactNode, useContext } from "react";

const InterviewDetailSettingContext = createContext<
  (InterviewTypes.InterviewDetailSetting & { companyName: string }) | null
>(null);

const InterviewDetailSettingProvider = ({
  interviewDetailSetting,
  children,
}: {
  children: ReactNode;
  interviewDetailSetting: InterviewTypes.InterviewDetailSetting;
}) => {
  const { company } = interviewDetailSetting;
  const companyName =
    typeof company === "string" ? company : company.companyName;
  return (
    <InterviewDetailSettingContext.Provider
      value={{
        ...interviewDetailSetting,
        companyName,
      }}
    >
      {children}
    </InterviewDetailSettingContext.Provider>
  );
};

export const useInterviewDetailSetting = () => {
  const context = useContext(InterviewDetailSettingContext);

  if (!context) throw new Error();
  return context;
};

export default InterviewDetailSettingProvider;
