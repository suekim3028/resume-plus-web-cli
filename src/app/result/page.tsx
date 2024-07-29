"use client";
import { GridItem } from "@chakra-ui/react";
import { Icon, TopBarContainer } from "@components";
import { Flex, GridWrapper, Text } from "@uis";
import CompletedResultList from "./components/CompletedResultList";

const Result = () => {
  return (
    <TopBarContainer>
      <GridWrapper>
        <GridItem colSpan={12}>
          <Flex direction={"column"} w="100%" pt={88}>
            <Flex w="100%" alignItems={"center"}>
              <Text type="Title2" fontWeight={"700"}>
                면접 결과
              </Text>
              <Icon
                ml={8}
                name="circleQuestionFill"
                size={24}
                onClick={() => {
                  //popup
                }}
              />
            </Flex>
            <Text type="Title3" fontWeight={"500"} mt={24} mb={40}>
              분석 완료
            </Text>
            <CompletedResultList />
          </Flex>
        </GridItem>
      </GridWrapper>
    </TopBarContainer>
  );
};

export default Result;
