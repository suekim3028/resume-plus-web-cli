import { useCompanyData } from "@atoms";
import { ListSelector, ListSelectorRef } from "@components";
import { InterviewTypes } from "@types";
import { Form } from "@web-core";
import { useRef } from "react";
import { InterviewSettingValue } from "../types";

const DepartmentSelector: Form.FormItemElement<
  InterviewSettingValue,
  "department"
> = (link) => {
  const { departmentGroups } = useCompanyData();

  const listSelectorRef =
    useRef<ListSelectorRef<InterviewTypes.Department>>(null);
  const { valueChangeHandler } = Form.useFormItem({
    link,
    validateFn: "boolean",
  });

  return (
    <ListSelector<InterviewTypes.Department>
      ref={listSelectorRef}
      itemList={departmentGroups.map((value) => ({
        label: value.department,
        value,
      }))}
      placeholder="직군을 선택해주세요"
      onSelect={valueChangeHandler}
    />
  );
};

export default DepartmentSelector;
