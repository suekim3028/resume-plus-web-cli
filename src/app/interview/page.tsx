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
import { Flex, GridWrapper } from "@uis";
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
      label: `아이템 ${idx}번`,
    }));
  const dummyJobs: ListSelectorItem<InterviewTypes.Job>[] = Array.from(
    { length: 20 },
    (_, idx) => ({
      value: { job: `직무 ${idx}번`, id: idx },
      label: `아이템 ${idx}번`,
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
          <GridItem colSpan={5} colStart={4}>
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
          </GridItem>
        </GridWrapper>
      </Flex>
    </TopBarContainer>
  );
};

export default Interview;
