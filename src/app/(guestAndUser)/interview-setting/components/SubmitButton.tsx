import { interviewApis } from "@apis";
import { useRefreshUser } from "@atoms";
import { EventLogger, Spinner } from "@components";
import { Button } from "@uis";
import { Form, ModalManager } from "@web-core";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { InterviewSettingValue } from "../types";
import { getTextFromPdf } from "../utils";
import ConfirmPopup from "./ConfirmPopup";

const isSubmittableValue = (
  value: Form.WIPValue<InterviewSettingValue>
): value is InterviewSettingValue => {
  const { isDefaultResume, ...requiredValue } = value;
  return Object.values(requiredValue).every(Boolean);
};

const SubmitButton: Form.FormSubmitElement<InterviewSettingValue> = ({
  isSubmittable,
  getCurrentValue,
}) => {
  const refreshUser = useRefreshUser();
  const router = useRouter();

  const getValue = useCallback(() => {
    const currentValue = getCurrentValue();
    if (!isSubmittableValue(currentValue)) return;
    return currentValue;
  }, [getCurrentValue]);

  const logInterviewSettingButton = (value: InterviewSettingValue) => {
    const { company, job, department } = value;

    EventLogger.log("interview_setting_button", {
      corp_name: typeof company === "string" ? company : company.companyName,
      job_name: job.companyJob,
      occupation_name: department.department,
    });
  };

  const uploadCv = async ({
    resume,
    isDefaultResume,
    job,
  }: InterviewSettingValue) => {
    return await interviewApis.uploadCV({
      content: await getTextFromPdf(resume),
      isDefault: isDefaultResume,
      name: resume.name,
      position: job.companyJob,
    });
  };

  const createInterview = ({
    company,
    department,
    job,
    resumeId,
  }: InterviewSettingValue & { resumeId: number }) => {
    return interviewApis.createInterview(
      typeof company === "string"
        ? {
            companyName: company,
            departmentId: department.departmentId,
            interviewRound: "1차 면접",
            jobId: job.companyJobId,
            resumeId,
          }
        : {
            companyId: company.companyId,

            departmentId: department.departmentId,
            interviewRound: "1차 면접",
            jobId: job.companyJobId,
            resumeId,
          }
    );
  };

  // TODO: memoization
  const submit = async () => {
    const submitValue = getValue();
    if (!submitValue) return;

    ModalManager.show({ closeOnDim: false, Component: <Spinner size={30} /> });
    logInterviewSettingButton(submitValue);

    const { isError: resumeError, data: resumeData } = await uploadCv(
      submitValue
    );

    if (resumeError) {
      return ModalManager.close();
    }

    const { isError, data } = await createInterview({
      ...submitValue,
      resumeId: resumeData.resumeId,
    });

    await refreshUser();
    ModalManager.close();
    if (!isError) router.replace(`interview/${data.interviewId}`);
  };

  const handleClickConfirmOnPopup = useCallback(() => {
    const elem = document.getElementById("body");
    if (elem && elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    submit();
  }, [submit]);

  const handleClickSubmitButton = useCallback(() => {
    const value = getValue();
    if (!value) return;

    ModalManager.show({
      closeOnDim: true,
      Component: (
        <ConfirmPopup
          value={value}
          onClickConfirmButton={handleClickConfirmOnPopup}
          onClickCloseButton={ModalManager.close}
        />
      ),
    });
  }, [getValue, handleClickConfirmOnPopup]);

  return (
    <Button
      type={"Solid_Primary"}
      size={"Large"}
      title={"면접 시작하기"}
      stretch
      flexProps={{
        mt: 96,
        transition: "all 0.3s ease-out",
        // transform: `translateY(${showPrivacyText ? "0px" : "-272px"})`, // TODO
      }}
      disabled={!isSubmittable}
      onClick={handleClickSubmitButton}
    />
  );
};

export default SubmitButton;
