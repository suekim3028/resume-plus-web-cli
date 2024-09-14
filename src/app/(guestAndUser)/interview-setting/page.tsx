"use client";
import { interviewApis } from "@apis";
import { useCompanyData } from "@atoms";

import { GridItem } from "@chakra-ui/react";
import {
  Icon,
  ListSelector,
  ListSelectorRef,
  PopUp,
  TypingSelector,
  TypingSelectorRef,
} from "@components";
import { UI, WEBSITE_CONSTS } from "@constants";
import { InterviewTypes } from "@types";
import { Button, Flex, GridWrapper, Text } from "@uis";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { pdfjs } from "react-pdf";

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
  const { companies, departmentGroups, getJobsByDepartmentId } =
    useCompanyData();

  const companyRef = useRef<TypingSelectorRef>(null);
  const departmentRef =
    useRef<ListSelectorRef<InterviewTypes.Department>>(null);
  const jobRef = useRef<ListSelectorRef<InterviewTypes.Job>>(null);

  const refs = [companyRef.current, departmentRef.current, jobRef.current];

  const valueRef = useRef<InputValue>({
    company: null,
    department: null,
    job: null,
  });
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [defaultResume, setDefaultResume] = useState(false);
  const [checker, setChecker] = useState(0);
  const [resume, setResume] = useState<File | null>(null);
  const [showPrivacyText, setShowPrivacyText] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const jobs = useMemo(() => {
    if (!valueRef.current.department) return [];
    return getJobsByDepartmentId(valueRef.current.department?.departmentId);
  }, [checker, getJobsByDepartmentId]);

  const submitValue = useMemo(():
    | { canSubmit: true; value: SubmittableValue & { resume: File } }
    | { canSubmit: false; value: null } => {
    const value = valueRef.current;
    if (isInputValueSubmittable(value) && !!resume && privacyAgreed) {
      return {
        canSubmit: true,
        value: { ...value, resume },
      };
    } else {
      return {
        canSubmit: false,
        value: null,
      };
    }
  }, [checker, privacyAgreed, resume]);

  const handleOnFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { files } = e.target;
    if (!files || files.length == 0) {
      setResume(null);
    } else {
      setResume(files[0]);
    }
  };

  const checkCanSubmit = () => {
    setChecker((p) => p + 1);
  };

  const getText = async (file: File): Promise<string> => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

    const document = await pdfjs.getDocument(await file.arrayBuffer()).promise;

    const textArr: string[] = [];

    for (let index of Array.from({ length: document.numPages }, (_, i) => i)) {
      const page = await document.getPage(index + 1);
      const pageContent = await page.getTextContent();
      pageContent.items.map((item) => {
        if ("str" in item) {
          textArr.push(item.str);
        }
      });
    }
    return textArr.join(" ");
  };

  const onValueChange = <T extends keyof InputValue>(
    key: T,
    value: InputValue[T]
  ) => {
    console.log(value);
    valueRef.current = { ...valueRef.current, [key]: value };

    checkCanSubmit();
  };

  const onClickSubmit = () => {
    setShowConfirmPopup(true);
  };

  const submit = async () => {
    if (!submitValue.canSubmit) return;

    const { company, job, department, resume } = submitValue.value;

    const { isError: resumeError, data: resumeData } =
      await interviewApis.uploadCV({
        content: await getText(resume),
        isDefault: defaultResume,
        name: resume.name,
        position: job.companyJob,
      });
    if (resumeError) return;

    const { isError, data } = await interviewApis.createInterview(
      typeof company === "string"
        ? {
            companyName: company,
            departmentId: department.departmentId,
            interviewRound: "1차 면접",
            jobId: job.companyJobId,
            resumeId: resumeData.resumeId,
          }
        : {
            companyId: company.companyId,

            departmentId: department.departmentId,
            interviewRound: "1차 면접",
            jobId: job.companyJobId,
            resumeId: resumeData.resumeId,
          }
    );

    if (!isError) router.replace(`interview/${data.interviewId}`);
  };

  return (
    <>
      <Flex
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        onClick={(e) => {
          refs.forEach((r) => r?.close());
          if (!valueRef.current.company) {
            companyRef.current?.clear();
          }
        }}
        pb={120}
      >
        <GridWrapper>
          <GridItem colSpan={6} colStart={4} pt={88}>
            <Text
              type="Title2"
              fontWeight={"700"}
              mb={80}
            >{`아래 정보를 추가하면\n맞춤형 면접 환경을 제공해드려요`}</Text>
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

            <TypingSelector<InterviewTypes.Company>
              ref={companyRef}
              placeholder="기업명을 입력해주세요"
              itemList={companies.map((value) => ({
                label: value.companyName,
                value,
              }))}
              onSelect={(v) => onValueChange("company", v)}
              onTypingSelect={(v) => onValueChange("company", v)}
            />
            <ListSelector<InterviewTypes.Department>
              ref={departmentRef}
              itemList={departmentGroups.map((value) => ({
                label: value.department,
                value,
              }))}
              placeholder="직군을 선택해주세요"
              onSelect={(v) => {
                onValueChange("department", v);
                jobRef.current?.select(null);
              }}
            />
            <ListSelector<InterviewTypes.Job>
              ref={jobRef}
              itemList={jobs.map((value) => ({
                label: value.companyJob,
                value,
              }))}
              placeholder="직무를 선택해주세요"
              onSelect={(v) => onValueChange("job", v)}
              disabled={!jobs.length}
              disabledMsg="직군을 먼저 선택해주세요"
            />

            <Text type="Heading2" fontWeight={"600"} mt={60}>
              면접 상세 설정
            </Text>
            <Text
              type="Headline2"
              color={"Accent/Red Orange"}
              fontWeight={"500"}
            >
              초기 설정 외 다른 기능은 사용할 수 없어요
            </Text>
            <Text type="Body2_Normal" fontWeight={"500"} mt={16} mb={24}>
              면접 상세 설정
            </Text>

            <TemporaryButtons
              list={[
                {
                  label: "1차 면접",
                  selected: true,
                },
                {
                  label: "2차 면접",
                  selected: false,
                },
                {
                  label: "3차 면접",
                  selected: false,
                },
                {
                  label: "최종 면접",
                  selected: false,
                },
              ]}
            />
            <Text type="Body2_Normal" fontWeight={"500"} my={24}>
              면접 대상을 선택해주세요
            </Text>

            <TemporaryButtons
              list={[
                {
                  label: "AI 면접",
                  selected: false,
                },
                {
                  label: "실무진 면접",
                  selected: true,
                },
                {
                  label: "임원/대표 면접",
                  selected: false,
                },
                {
                  label: "HR 면접",
                  selected: false,
                },
              ]}
            />

            <Flex w="100%" mt={24}>
              <Flex direction={"column"} flex={1}>
                <Text type="Body2_Normal" fontWeight={"500"}>
                  면접 형태
                </Text>
                {/* <ListSelector<string> itemList={[{"label":""}]} /> */}
                <Flex
                  px={8}
                  py={10}
                  borderBottom={"1px solid rgba(55, 56, 60, 0.16)"}
                  w="100%"
                >
                  <Text
                    type="Body1_Normal"
                    fontWeight={"400"}
                    color={"Label/Disable"}
                  >
                    일반 면접
                  </Text>
                </Flex>
              </Flex>
              <Flex w={24} />
              <Flex direction={"column"} flex={1}>
                <Text type="Body2_Normal" fontWeight={"500"}>
                  면접 인원
                </Text>
                <Flex
                  px={8}
                  py={10}
                  w="100%"
                  borderBottom={"1px solid rgba(55, 56, 60, 0.16)"}
                >
                  <Text
                    type="Body1_Normal"
                    fontWeight={"400"}
                    color={"Label/Disable"}
                  >
                    일반 면접
                  </Text>
                </Flex>
              </Flex>
            </Flex>
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
              <Flex
                alignItems={"center"}
                mb={8}
                onClick={() => setDefaultResume((p) => !p)}
                cursor={"pointer"}
              >
                <Icon
                  name={
                    defaultResume
                      ? "normalCircleCheckPrimary"
                      : "normalCircleCheck"
                  }
                  size={16}
                />
                <Text
                  type="Caption1"
                  fontWeight={"400"}
                  color={
                    defaultResume ? "Primary/Normal" : "Interaction/Inactive"
                  }
                  ml={4}
                >
                  기본 이력서로 설정하기
                </Text>
              </Flex>
              <Flex
                w="100%"
                borderRadius={8}
                bgColor={"Fill/Normal"}
                py={10.5}
                px={16}
                cursor={"pointer"}
                onClick={() =>
                  document.getElementById("resume_upload")?.click()
                }
              >
                {resume ? (
                  <Flex
                    w="100%"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
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
                        setResume(null);
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
                ref={fileRef}
                onChange={handleOnFileChange}
                multiple={false}
              />
            </Flex>

            <Flex
              w={"100%"}
              flexDir={"column"}
              borderRadius={8}
              border={"1px solid rgba(112, 115, 124, 0.22)"}
              mt={24}
            >
              <Flex
                w="100%"
                alignItems={"center"}
                py={10.5}
                px={16}
                justifyContent={"space-between"}
              >
                <Flex
                  alignItems={"center"}
                  onClick={() => {
                    setPrivacyAgreed((p) => !p);
                  }}
                  cursor={"pointer"}
                >
                  <Icon
                    name={
                      privacyAgreed
                        ? "normalCircleCheckPrimary"
                        : "normalCircleCheck"
                    }
                    size={20}
                  />
                  <Text
                    type="Body1_Normal"
                    fontWeight={"600"}
                    color="Primary/Normal"
                    ml={4}
                  >
                    필수
                  </Text>
                  <Text
                    type="Body1_Normal"
                    fontWeight={"600"}
                    color="Label/Normal"
                    ml={10}
                  >
                    개인정보 수집 및 이용동의 약관
                  </Text>
                </Flex>
                <Icon
                  onClick={() => setShowPrivacyText((p) => !p)}
                  name={
                    showPrivacyText ? "chevronUpNormal" : "chevronDownNormal"
                  }
                  size={24}
                />
              </Flex>
              {showPrivacyText && (
                <Flex
                  h={240}
                  p={16}
                  overflowY={"scroll"}
                  bgColor={"Background/Elevated/Alternative"}
                  borderTop={`1px solid ${UI.COLORS["Line/Normal/Normal"]}`}
                >
                  <Text
                    type="Body1_Normal"
                    color="Label/Neutral"
                    fontWeight={"400"}
                  >
                    {WEBSITE_CONSTS.PRIVACY_DATA_TEXT}
                  </Text>
                </Flex>
              )}
            </Flex>

            <Button
              type={"Solid_Primary"}
              size={"Large"}
              title={"면접 시작하기"}
              stretch
              flexProps={{ mt: 32 }}
              disabled={!submitValue.canSubmit}
              onClick={onClickSubmit}
            />
          </GridItem>
        </GridWrapper>
      </Flex>
      {showConfirmPopup && submitValue.canSubmit && (
        <ConfirmPopup
          confirm={submit}
          value={submitValue.value}
          close={() => setShowConfirmPopup(false)}
        />
      )}
    </>
  );
};

const TemporaryButtons = ({
  list,
}: {
  list: { label: string; selected: boolean }[];
}) => {
  return (
    <Flex w="100%" gap={8} py={8} px={9.5}>
      {list.map(({ label, selected }) => {
        const color = selected ? "Primary/Normal" : "Label/Disable";
        return (
          <Flex
            key={label}
            flex={1}
            borderRadius={10}
            justifyContent={"center"}
            alignItems={"center"}
            py={12}
            border={`1px solid ${UI.COLORS[color]}`}
          >
            <Text type={"Body2_Normal"} color={color}>
              {label}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

const ConfirmPopup = ({
  value,
  confirm,
  close,
}: {
  value: SubmittableValue & {
    resume: File;
  };
  confirm: () => void;
  close: () => void;
}) => {
  const { company, job, department, resume } = value;
  return (
    <PopUp visible={true}>
      <Flex
        borderRadius={16}
        w={480}
        bgColor={"Background/Normal/Alternative"}
        px={40}
        pt={20}
        pb={17}
        flexDir={"column"}
        alignItems={"center"}
      >
        <Text type={"Heading1"} fontWeight={"600"} color={"Label/Neutral"}>
          입력한 내용을 마지막으로 확인해주세요
        </Text>
        <Flex
          w="100%"
          py={4}
          px={14}
          bgColor={"Static/White"}
          borderRadius={8}
          mt={12}
          gap={16}
          flexDir={"column"}
        >
          <Row
            title={"지원 직무"}
            body={`${
              typeof company === "string" ? company : company.companyName
            } > ${department.department} > ${job.companyJob}`}
          />
          <Row title={"면접 유형"} body={"1차 > 실무진 > 일반 > 1:1 "} />
          <Row title={"이력서 및 경력기술서"} body={resume.name} />
        </Flex>
        <Flex gap={16} mt={12}>
          <Button
            size={"Large"}
            type={"Outlined_Secondary"}
            title={"다시 입력"}
            onClick={close}
            flexProps={{
              width: 116,
              height: 48,
              padding: 0,
            }}
          />
          <Button
            size={"Large"}
            type={"Solid_Primary"}
            title={"면접 시작"}
            flexProps={{ width: 116, height: 48, padding: 0 }}
            onClick={() => {
              confirm();
              const elem = document.getElementById("body");

              if (elem && elem.requestFullscreen) {
                elem.requestFullscreen();
              }
            }}
          />
        </Flex>
      </Flex>
    </PopUp>
  );
};

const Row = ({ title, body }: { title: string; body: string }) => {
  return (
    <Flex flexDir={"column"} w="100%">
      <Text
        type={"Body1_Normal"}
        color={"Primary/Normal"}
        fontWeight={"600"}
        my={4}
      >
        {title}
      </Text>
      <Text
        type={"Label2"}
        color={"Label/Alternative"}
        fontWeight={"500"}
        my={4}
      >
        {body}
      </Text>
    </Flex>
  );
};

export default Interview;
