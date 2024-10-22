import { useCompanyData } from "@atoms";
import { ListSelector, ListSelectorRef } from "@components";
import { InterviewTypes } from "@types";
import { Form } from "@web-core";
import { useCallback, useEffect, useRef, useState } from "react";
import { InterviewSettingValue } from "../types";

const JobSelector: Form.FormItemElement<InterviewSettingValue, "job"> = (
  link
) => {
  const [jobs, setJobs] = useState<InterviewTypes.Job[]>([]);
  const { getJobsByDepartmentId } = useCompanyData();
  const { valueChangeHandler, addValueChangeListenerByKey } = Form.useFormItem({
    link,
    validateFn: "boolean",
  });

  const listSelectorRef = useRef<ListSelectorRef<InterviewTypes.Job>>(null);

  const handleChangeDepartment = useCallback(
    (department: InterviewTypes.Department | undefined) => {
      if (!department) return setJobs([]);
      setJobs(getJobsByDepartmentId(department.departmentId));
      listSelectorRef.current?.select(undefined);
    },
    [getJobsByDepartmentId]
  );

  useEffect(() => {
    const sub = addValueChangeListenerByKey(
      "department",
      handleChangeDepartment
    );
    return () => sub.unsubscribe();
  }, [handleChangeDepartment]);

  return (
    <ListSelector<InterviewTypes.Job>
      ref={listSelectorRef}
      itemList={jobs.map((value) => ({
        label: value.companyJob,
        value,
      }))}
      placeholder="직무를 선택해주세요"
      onSelect={valueChangeHandler}
      disabled={!jobs.length}
      disabledMsg="직군을 먼저 선택해주세요"
    />
  );
};

export default JobSelector;
