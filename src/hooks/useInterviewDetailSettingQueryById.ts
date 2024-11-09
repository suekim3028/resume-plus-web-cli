import { queryOptions } from "@queries";
import { useQueries } from "@tanstack/react-query";
import { InterviewTypes } from "@types";
import { interviewUtils } from "@utils";
import { jsUtils } from "@web-core";
import assert from "assert";
import { useRef } from "react";

export const useInterviewDetailSettingQueryById = (
  interviewId: number
): {
  isLoading: boolean;
  isError: boolean;
  data: InterviewTypes.InterviewDetailSetting | null;
} => {
  const interviewerName = useRef(
    jsUtils.getRandomArrItem(["김", "이", "박", "정"])
  ).current;

  const queries = useQueries({
    queries: [
      queryOptions.companyDeptOptions,
      queryOptions.getInterviewSimpleSettingOptions(interviewId),
    ],
  });

  if (!queries.every((q) => !!q.data)) {
    return {
      isLoading: queries.some((q) => q.isLoading),
      isError: queries.some((q) => q.isError),
      data: null,
    };
  }

  const [positionDBQuery, interviewSimpleSettingQuery] = queries;
  assert(!!interviewSimpleSettingQuery.data && !!positionDBQuery.data);
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
      interviewerName,
      interviewId,
      company,
      department,
      job,
    },
  };
};
