import { ListSelector, ListSelectorRef } from "@components";
import { queryOptions } from "@queries";
import { useQuery } from "@tanstack/react-query";
import { InterviewTypes } from "@types";
import { Form } from "@web-core";
import { useRef } from "react";
import { InterviewSettingValue } from "../types";

const DepartmentSelector: Form.FormItemElement<
  InterviewSettingValue,
  "department"
> = (link) => {
  const { data: companyData } = useQuery(queryOptions.companyDeptOptions);
  const listSelectorRef =
    useRef<ListSelectorRef<InterviewTypes.Department>>(null);
  const { valueChangeHandler } = Form.useFormItem({
    link,
    validateFn: "boolean",
  });

  const deptGroups = companyData?.departments || [];
  return (
    <ListSelector<InterviewTypes.Department>
      ref={listSelectorRef}
      itemList={deptGroups.map((value) => ({
        label: value.department,
        value,
      }))}
      placeholder="직군을 선택해주세요"
      onSelect={valueChangeHandler}
    />
  );
};

export default DepartmentSelector;
