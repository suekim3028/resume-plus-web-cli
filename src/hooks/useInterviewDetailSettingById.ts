import { queryOptions } from "@queries";
import { useQueries } from "@tanstack/react-query";
import { InterviewTypes } from "@types";
import { interviewUtils } from "@utils";

export const useInterviewDetailSettingById = (
  interviewId: number
): {
  isLoading: boolean;
  isError: boolean;
  data: InterviewTypes.InterviewDetailSetting | null;
} => {
  const [positionDBQuery, interviewSimpleSettingQuery] = useQueries({
    queries: [
      queryOptions.companyDeptOptions,
      queryOptions.getInterviewSimpleSettingOptions(interviewId),
    ],
  });

  if (!positionDBQuery.data || !interviewSimpleSettingQuery.data) {
    return {
      isLoading:
        interviewSimpleSettingQuery.isLoading ||
        interviewSimpleSettingQuery.isLoading,
      isError:
        interviewSimpleSettingQuery.isError ||
        interviewSimpleSettingQuery.isError,
      data: null,
    };
  }

  const simpleSetting = interviewSimpleSettingQuery.data;
  const positionDB = positionDBQuery.data;

  const company =
    typeof simpleSetting.companyName === "string"
      ? simpleSetting.companyName
      : interviewUtils.findCompanyFromListById(
          positionDB.companies,
          simpleSetting.companyId
        );

  const department = interviewUtils.findDepartmentFromListById(
    positionDB.departments,
    simpleSetting.departmentId
  );

  const job = interviewUtils.findJobFromListById(
    positionDB.jobsByDepartmentId[simpleSetting.departmentId],
    simpleSetting.jobId
  );

  return {
    isLoading: false,
    isError: false,
    data: {
      interviewId,
      company,
      department,
      job,
    },
  };
};
