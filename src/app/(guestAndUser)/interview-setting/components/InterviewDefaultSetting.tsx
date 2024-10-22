import { Flex, Text } from "@uis";
import { Form } from "@web-core";
import { InterviewSettingValue } from "../types";
import CompanySelector from "./CompanySelector";
import DepartmentSelector from "./DepartmentSelector";
import JobSelector from "./JobSelector";

const InterviewDefaultSetting = ({
  form,
}: {
  form: Form.FormFactory<InterviewSettingValue>;
}) => {
  return (
    <>
      <Flex mb={4}>
        <Text type="Heading2" fontWeight={"600"}>
          기본정보
        </Text>
        <Text
          type="Heading2"
          fontWeight={"600"}
          color={"Accent/Red Orange"}
          ml={4}
        >
          *
        </Text>
      </Flex>
      <Flex flexDir={"column"} gap={40} mt={24}>
        <form.FormItem
          formKey="company"
          render={(link) => <CompanySelector {...link} />}
        />
        <form.FormItem
          formKey="department"
          render={(link) => <DepartmentSelector {...link} />}
        />
        <form.FormItem
          formKey="job"
          render={(link) => <JobSelector {...link} />}
        />
      </Flex>
    </>
  );
};

export default InterviewDefaultSetting;
