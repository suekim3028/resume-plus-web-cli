import { TypingSelector, TypingSelectorRef } from "@components";
import { queryOptions } from "@queries";
import { useQuery } from "@tanstack/react-query";
import { InterviewTypes } from "@types";
import { Form } from "@web-core";
import { useRef } from "react";
import { InterviewSettingValue } from "../types";

const CompanySelector: Form.FormItemElement<
  InterviewSettingValue,
  "company"
> = (link) => {
  const { data: companyData } = useQuery(queryOptions.companyDeptOptions);

  const typingSelectorRef = useRef<TypingSelectorRef>(null);
  const { valueChangeHandler } = Form.useFormItem({
    link,
    validateFn: "boolean",
  });

  const companies = companyData?.companies || [];

  return (
    <TypingSelector<InterviewTypes.Company>
      ref={typingSelectorRef}
      placeholder="기업명을 입력해주세요"
      itemList={companies.map((value) => ({
        label: value.companyName,
        value,
      }))}
      onSelect={valueChangeHandler}
      onTypingSelect={valueChangeHandler}
    />
  );
};
export default CompanySelector;
