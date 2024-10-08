"use client";

import { GridItem } from "@chakra-ui/react";
import { InterviewTypes } from "@types";
import { Flex, GridWrapper } from "@uis";
import { Form } from "@web-core";
import InterviewDefaultSetting from "./components/InterviewDefaultSetting";
import InterviewDetailSetting from "./components/InterviewDetailSetting";
import PrivacyAgreementCheckbox from "./components/PrivacyAgreementCheckbox";
import ResumeUploadGroup from "./components/ResumeUploadGroup";
import SubmitButton from "./components/SubmitButton";
import TitleSection from "./components/TitleSection";
import { InterviewSettingValue } from "./types";
type SubmittableValue = {
  company: InterviewTypes.Company | string;
  department: InterviewTypes.Department;
  job: InterviewTypes.Job;
};

type InputValue = {
  [key in keyof SubmittableValue]: SubmittableValue[key] | null;
};

const isInputValueSubmittable = (
  value: InputValue
): value is SubmittableValue => {
  return Object.keys(value).every((v) => !!value[v as keyof InputValue]);
};

const Interview = () => {
  const form = new Form.FormFactory<InterviewSettingValue>();

  return (
    <form.FormProvider
      defaultValue={{
        company: undefined,
        department: undefined,
        isDefaultResume: false,
        job: undefined,
        privacyAgreed: false,
        resume: undefined,
      }}
    >
      <Flex
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        onClick={(e) => {
          // TODO: blur
        }}
        pb={120}
      >
        <GridWrapper>
          <GridItem colSpan={6} colStart={4} pt={88}>
            <TitleSection />

            <InterviewDefaultSetting form={form} />
            <InterviewDetailSetting />
            <ResumeUploadGroup form={form} />

            <form.FormItem
              formKey="privacyAgreed"
              render={(link) => <PrivacyAgreementCheckbox {...link} />}
            />
            <form.Submit render={(link) => <SubmitButton {...link} />} />
          </GridItem>
        </GridWrapper>
      </Flex>
    </form.FormProvider>
  );
};

export default Interview;
