"use client";
import { GridItem } from "@chakra-ui/react";
import {
  Icon,
  ListSelector,
  ListSelectorRef,
  TopBarContainer,
  TypingSelector,
  TypingSelectorRef,
} from "@components";
import { UI } from "@constants";
import { companyDataStore } from "@store";
import { InterviewTypes } from "@types";
import { Button, Flex, GridWrapper, Text } from "@uis";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { useRecoilValue } from "recoil";

type InputValue = {
  company: InterviewTypes.Company | null | string;
  department: InterviewTypes.JobDepartment | null;
  job: InterviewTypes.Job | null;
};

const Interview = () => {
  const companyData = useRecoilValue(companyDataStore);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<TypingSelectorRef>(null);
  const departmentRef = useRef<ListSelectorRef>(null);
  const jobRef = useRef<ListSelectorRef>(null);

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
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const canSubmit = useMemo(() => {
    return (
      Object.keys(valueRef.current).every(
        (v) => !!valueRef.current[v as keyof InputValue]
      ) &&
      !!resume &&
      privacyAgreed
    );
  }, [checker, privacyAgreed, !!resume]);

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

  const getText = async (): Promise<string> => {
    if (!resume) return "";

    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

    const document = await pdfjs.getDocument(await resume.arrayBuffer())
      .promise;

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

  return (
    <TopBarContainer ref={wrapperRef}>
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
            {!!companyData && (
              <>
                <TypingSelector<InterviewTypes.Company>
                  ref={companyRef}
                  placeholder="기업명을 입력해주세요"
                  itemList={companyData.companies.map((value) => ({
                    label: value.name,
                    value,
                  }))}
                  onSelect={(v) => onValueChange("company", v)}
                  onTypingSelect={(v) => onValueChange("company", v)}
                />
                <ListSelector<InterviewTypes.JobDepartment>
                  ref={departmentRef}
                  itemList={companyData.departments.map((value) => ({
                    label: value.department,
                    value,
                  }))}
                  placeholder="직군을 선택해주세요"
                  onSelect={(v) => onValueChange("department", v)}
                />
                <ListSelector<InterviewTypes.Job>
                  ref={jobRef}
                  itemList={companyData.jobs.map((value) => ({
                    label: value.job,
                    value,
                  }))}
                  placeholder="직무를 선택해주세요"
                  onSelect={(v) => onValueChange("job", v)}
                />
              </>
            )}
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
                  color="Primary/Normal"
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
              w="100%"
              mt={24}
              alignItems={"center"}
              py={4}
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
                color="Label/Alternative"
                ml={10}
              >
                개인정보 수집 및 이용동의 약관
              </Text>
            </Flex>
            <Flex
              h={56}
              py={4}
              px={17}
              mt={16}
              overflowY={"scroll"}
              rounded={8}
              bgColor={"Background/Elevated/Alternative"}
              border={`1px solid ${UI.COLORS["Line/Normal/Strong"]}`}
            >
              <Text type="Caption2" color="Label/Neutral" fontWeight={"400"}>
                쏘카 (이하 “회사”라 함)은(는) “Greeting” 을 통한 채용 절차
                진행을 위하여 귀하의 정보를 수집합니다. 1. 수집하는 개인정보의
                필수항목 •성명, 전화번호, 이메일 2. 개인정보처리의 목적 •채용
                관련 안내, 공지사항 전달, 채용 및 웹사이트 이용 관련 연락, 채용
                적합성 판단 및 서류심사/면접 등의 근거 자료, 인재 DB 활용 등 3.
                보유기간 •접수 지원 후 3년간, 단 정보주체의 삭제 요청이 있는
                경우 지체없이 파기 ※ 회사는 본인이 작성/제출한 정보에 한하여
                정보를 수집합니다. 채용서비스의 특성상 민감한 정보 등이 수집될
                수 있으니 작성/제출에 유의하여 주시기 바랍니다. ※ 귀하는 개인
                정보 수집ㆍ이용에 대한 동의를 거부할 권리가 있습니다. 그러나
                동의를 거부할 경우 원활한 기업 측으로의 지원자 정보 전달을
                진행할 수 없어 본건 서비스에 제한을 받을 수 있습니다
              </Text>
            </Flex>

            <Button
              type={"Solid_Primary"}
              size={"Large"}
              title={"면접 시작하기"}
              stretch
              flexProps={{ mt: 32 }}
              disabled={!canSubmit}
              onClick={() => router.replace(`interview/${1}`)}
            />
          </GridItem>
        </GridWrapper>
      </Flex>
    </TopBarContainer>
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

export default Interview;
