import { Icon } from "@components";
import { Flex, Text } from "@uis";
import { Form } from "@web-core";
import { ChangeEventHandler, useCallback, useRef, useState } from "react";
import { InterviewSettingValue } from "../types";

const ResumeUploadGroup = ({
  form,
}: {
  form: Form.FormFactory<InterviewSettingValue>;
}) => {
  return (
    <Flex direction={"column"}>
      <Flex mt={80} mb={24}>
        <Text type="Heading2" fontWeight={"600"}>
          이력서 및 경력 기술서
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

      <form.FormItem
        formKey="isDefaultResume"
        render={(link) => <DefaultResumeChecker {...link} />}
      />
      <form.FormItem
        formKey="resume"
        render={(link) => <ResumeUploader {...link} />}
      />
    </Flex>
  );
};

const ResumeUploader: Form.FormItemElement<InterviewSettingValue, "resume"> = (
  link
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [resume, DO_NOT_UPDATE_setResume] = useState<File | undefined>();
  const { valueChangeHandler } = Form.useFormItem({
    link,
    validateFn: "boolean",
  });

  const handleUploadFile = useCallback((file: File | undefined) => {
    valueChangeHandler(file);
    DO_NOT_UPDATE_setResume(file);
  }, []);

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { files } = e.target;
      if (!files || files.length == 0) {
        handleUploadFile(undefined);
      } else {
        handleUploadFile(files[0]);
      }
    },
    [handleUploadFile]
  );

  return (
    <>
      <Flex
        w="100%"
        borderRadius={8}
        bgColor={"Fill/Normal"}
        py={10.5}
        px={16}
        cursor={"pointer"}
        onClick={() => document.getElementById("resume_upload")?.click()}
      >
        {resume ? (
          <Flex w="100%" justifyContent={"space-between"} alignItems={"center"}>
            <Text
              type="Body1_Normal"
              color={"Material/Dimmer"}
              fontWeight={"400"}
            >
              {resume.name}
            </Text>
            <Flex
              cursor={"pointer"}
              onClick={(e) => {
                handleUploadFile(undefined);
                e.stopPropagation();
              }}
            >
              <Icon name={"normalClose"} size={16} />
            </Flex>
          </Flex>
        ) : (
          <>
            <Icon name={"normalUpload"} size={24} />
            <Text
              ml={8}
              type={"Body1_Normal"}
              fontWeight={"400"}
              color={"Material/Dimmer"}
              cursor={"pointer"}
            >
              이곳에 파일을 올려주세요
            </Text>
          </>
        )}
      </Flex>
      <Text
        type={"Caption1"}
        fontWeight={"400"}
        color={"Label/Assistive"}
        mt={8}
      >
        * PDF 형식으로 올려주세요
      </Text>
      <input
        type={"file"}
        accept=".pdf"
        style={{
          width: 0,
          height: 0,
          display: "none",
          position: "fixed",
          top: -10000,
          left: -10000,
        }}
        id="resume_upload"
        ref={inputRef}
        onChange={handleChangeInput}
        multiple={false}
      />
    </>
  );
};

const DefaultResumeChecker: Form.FormItemElement<
  InterviewSettingValue,
  "isDefaultResume"
> = (link) => {
  const [isDefaultResume, setIsDefaultResume] = useState(false);
  const { valueChangeHandler } = Form.useFormItem({
    link,
    validateFn: "always",
  });

  const handleClickIcon = useCallback(() => {
    setIsDefaultResume((p) => {
      valueChangeHandler(!p);
      return !p;
    });
  }, [valueChangeHandler]);

  return (
    <Flex
      alignItems={"center"}
      mb={8}
      onClick={handleClickIcon}
      cursor={"pointer"}
    >
      <Icon
        name={
          isDefaultResume ? "normalCircleCheckPrimary" : "normalCircleCheck"
        }
        size={16}
      />
      <Text
        type="Caption1"
        fontWeight={"400"}
        color={isDefaultResume ? "Primary/Normal" : "Interaction/Inactive"}
        ml={4}
      >
        기본 이력서로 설정하기
      </Text>
    </Flex>
  );
};

export default ResumeUploadGroup;
