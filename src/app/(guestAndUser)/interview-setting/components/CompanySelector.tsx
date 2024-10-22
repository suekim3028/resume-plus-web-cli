import { useCompanyData } from "@atoms";
import { TypingSelector, TypingSelectorRef } from "@components";
import { InterviewTypes } from "@types";
import { Form } from "@web-core";
import { useRef } from "react";
import { InterviewSettingValue } from "../types";

const CompanySelector: Form.FormItemElement<
  InterviewSettingValue,
  "company"
> = (link) => {
  const { companies } = useCompanyData();

  const typingSelectorRef = useRef<TypingSelectorRef>(null);
  const { valueChangeHandler } = Form.useFormItem({
    link,
    validateFn: "boolean",
  });

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
