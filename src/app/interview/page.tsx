"use client";
import { GridItem } from "@chakra-ui/react";
import {
  Icon,
  ListSelector,
  ListSelectorItem,
  ListSelectorRef,
  TopBarContainer,
  TypingSelector,
  TypingSelectorItem,
  TypingSelectorRef,
} from "@components";
import { UI } from "@constants";
import { InterviewTypes } from "@types";
import { Button, Flex, GridWrapper, Text } from "@uis";
import { useRef, useState } from "react";

type InputValue = {
  company: InterviewTypes.Company | null | string;
  department: InterviewTypes.JobDepartment | null;
  job: InterviewTypes.Job | null;
};

const Interview = () => {
  const dummyCompanies: TypingSelectorItem<InterviewTypes.Company>[] =
    Array.from({ length: 20 }, (_, idx) => ({
      value: { id: idx, name: `회사 ${idx}번` },
      label: `회사 ${idx}번`,
    }));

  const dummyDeps: ListSelectorItem<InterviewTypes.JobDepartment>[] =
    Array.from({ length: 20 }, (_, idx) => ({
      value: { department: `직군 ${idx}번`, id: idx },
      label: `직군 ${idx}번`,
    }));
  const dummyJobs: ListSelectorItem<InterviewTypes.Job>[] = Array.from(
    { length: 20 },
    (_, idx) => ({
      value: { job: `직무 ${idx}번`, id: idx },
      label: `직무 ${idx}번`,
    })
  );
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
  const resumeRef = useRef();
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const onValueChange = <T extends keyof InputValue>(
    key: T,
    value: InputValue[T]
  ) => {
    valueRef.current = { ...valueRef.current, [key]: value };
    setCanSubmit(
      Object.keys(valueRef.current).every(
        (v) => !!valueRef.current[v as keyof InputValue]
      ) && !!resumeRef.current
    );
  };

  return (
    <TopBarContainer ref={wrapperRef}>
      <Flex
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        onClick={(e) => {
          console.log("!!");
          refs.forEach((r) => r?.close());
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
            <TypingSelector<InterviewTypes.Company>
              ref={companyRef}
              placeholder="기업명을 입력해주세요"
              itemList={dummyCompanies}
              onSelect={(v) => (valueRef.current.company = v)}
              onTypingSelect={(v) => (valueRef.current.company = v)}
            />
            <ListSelector<InterviewTypes.JobDepartment>
              ref={departmentRef}
              itemList={dummyDeps}
              placeholder="직군을 선택해주세요"
              onSelect={(v) => (valueRef.current.department = v)}
            />
            <ListSelector<InterviewTypes.Job>
              ref={jobRef}
              itemList={dummyJobs}
              placeholder="직무를 선택해주세요"
              onSelect={(v) => (valueRef.current.job = v)}
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
            <Text type="Body2_Normal" fontWeight={"500"} mt={16}>
              면접 상세 설정
            </Text>
            <Flex>
              {
                //버튼들
              }
            </Flex>
            <Text type="Body2_Normal" fontWeight={"500"} mt={24}>
              면접 대상을 선택해주세요
            </Text>
            <Flex>
              {
                //버튼들
              }
            </Flex>
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
              w="100%"
              mt={24}
              alignItems={"center"}
              py={4}
              onClick={() => setPrivacyAgreed((p) => !p)}
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
            />
          </GridItem>
        </GridWrapper>
      </Flex>
    </TopBarContainer>
  );
};

export default Interview;
