"use client";
import { GridItem } from "@chakra-ui/react";
import {
  ListSelector,
  ListSelectorItem,
  ListSelectorRef,
  TopBarContainer,
  TypingSelector,
  TypingSelectorItem,
  TypingSelectorRef,
} from "@components";
import { InterviewTypes } from "@types";
import { Flex, GridWrapper, Text } from "@uis";
import { useRef } from "react";

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

  const valueRef = useRef<{
    company: InterviewTypes.Company | null | string;
    department: InterviewTypes.JobDepartment | null;
    job: InterviewTypes.Job | null;
  }>({
    company: null,
    department: null,
    job: null,
  });

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
            ₩
          </GridItem>
        </GridWrapper>
      </Flex>
    </TopBarContainer>
  );
};

export default Interview;
