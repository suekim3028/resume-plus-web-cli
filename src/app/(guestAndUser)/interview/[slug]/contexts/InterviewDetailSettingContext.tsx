"use client";
import { CompanyThumbnail } from "@components";
import { InterviewTypes } from "@types";
import { createContext, ReactNode, useContext } from "react";

const InterviewDetailSettingContext = createContext<
  | (InterviewTypes.InterviewDetailSetting & {
      companyName: string;
      renderCompanyThumbnail: (size: "small" | "large") => JSX.Element;
    })
  | null
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

  const renderCompanyThumbnail = (size: "small" | "large") => {
    return (
      <CompanyThumbnail
        size={size}
        companyName={companyName}
        imageUrl={typeof company === "string" ? undefined : company.imageUrl}
      />
    );
  };

  return (
    <InterviewDetailSettingContext.Provider
      value={{
        ...interviewDetailSetting,
        companyName,
        renderCompanyThumbnail,
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
