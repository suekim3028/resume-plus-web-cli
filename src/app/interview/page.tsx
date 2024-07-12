"use client";
import { GridItem } from "@chakra-ui/react";
import {
  ListItem,
  ListSelector,
  ListSelectorRef,
  TopBarContainer,
} from "@components";
import { Flex, GridWrapper } from "@uis";
import { useRef } from "react";

const Interview = () => {
  const dummy: ListItem<number>[] = Array.from({ length: 20 }, (_, idx) => ({
    value: idx,
    label: `아이템 ${idx}번`,
  }));

  const ref = useRef<ListSelectorRef>(null);

  return (
    <TopBarContainer>
      <Flex
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        onClick={(e) => {
          console.log("!!");

          ref.current?.close();
        }}
      >
        <GridWrapper>
          <GridItem colSpan={5} colStart={4}>
            <ListSelector
              ref={ref}
              itemList={dummy}
              placeholder="직군을 선택해주세요"
              onSelect={(value) => {
                console.log(value);
              }}
            />
            <ListSelector
              ref={ref}
              itemList={dummy}
              placeholder="직무를 선택해주세요"
              onSelect={(value) => {
                console.log(value);
              }}
            />
          </GridItem>
        </GridWrapper>
      </Flex>
    </TopBarContainer>
  );
};

export default Interview;
