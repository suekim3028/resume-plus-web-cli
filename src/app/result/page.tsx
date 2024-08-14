"use client";
import { GridItem } from "@chakra-ui/react";
import { Icon } from "@components";
import { Flex, GridWrapper, Text } from "@uis";
import { useState } from "react";
import CompletedResultList from "./components/CompletedResultList";
import PendingResultList from "./components/PendingResultList";

const Result = () => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <Flex flexDir={"column"} alignItems={"center"} w="100%">
      <GridWrapper>
        <GridItem colSpan={12}>
          <Flex direction={"column"} w="100%" pt={88}>
            <Flex w="100%" alignItems={"center"} pb={24}>
              <Text type="Title2" fontWeight={"700"} mr={12}>
                면접 결과
              </Text>

              <div
                style={{
                  position: "relative",
                  overflow: "visible",
                  width: 300,
                }}
              >
                <Icon
                  name="circleQuestionFill"
                  size={24}
                  onClick={() => {
                    setShowInfo((p) => !p);
                  }}
                />
                {showInfo && (
                  <Flex
                    top={16}
                    alignItems={"flex-start"}
                    position={"absolute"}
                    left={12}
                    borderRadius={8}
                    bgColor={"Primary/Normal"}
                    p={4}
                  >
                    <Text
                      type="Caption2"
                      fontWeight={"500"}
                      color={"Static/White"}
                    >{`오른쪽 아래의 숫자는\n면접 종합 점수입니다`}</Text>
                  </Flex>
                )}
              </div>
            </Flex>
            <Text type="Title3" fontWeight={"500"} mb={40}>
              분석 완료
            </Text>
            <CompletedResultList />
            <Flex
              w={"100%"}
              h={2}
              bgRgbColor={"rgba(137, 138, 141, 1)"}
              my={40}
            />
            <Text type="Title3" fontWeight={"500"} mb={40}>
              면접 분석 중
            </Text>
            <PendingResultList />
          </Flex>
        </GridItem>
      </GridWrapper>
    </Flex>
  );
};

export default Result;
