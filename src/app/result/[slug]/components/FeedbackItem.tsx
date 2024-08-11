import ScoreBadge from "@app/result/components/ScoreBadge";
import { calcOneQuestionScoreMean } from "@app/result/utils";
import { Icon } from "@components";
import { UI } from "@constants";
import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";
import { useState } from "react";

const FeedbackItem = ({
  index,
  ...feedback
}: InterviewTypes.Feedback & { index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { question, userAnswer, gptEvaluation } = feedback;

  const score = calcOneQuestionScoreMean(feedback);

  return (
    <Flex
      borderRadius={16}
      border={`1px solid ${UI.COLORS["Line/Normal/Strong"]}`}
      flexDirection={"column"}
    >
      <Flex
        bgColor={isOpen ? "Fill/Normal" : "Static/White"}
        py={16}
        px={24}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        w="100%"
        onClick={() => setIsOpen((p) => !p)}
        borderBottom={
          isOpen ? `1px solid ${UI.COLORS["Line/Normal/Strong"]}` : undefined
        }
      >
        <Flex flex={1}>
          <Text type={"Heading1"} fontWeight={"500"} w={55}>
            {`Q${index}.`}
          </Text>
          <Flex>
            <Text type={"Heading1"} fontWeight={"500"}>
              {question}
            </Text>
          </Flex>
        </Flex>
        <Flex
          alignItems={"center"}
          gap={24}
          flexShrink={0}
          h={30}
          justifyContent={"center"}
        >
          <ScoreBadge score={score} size={"medium"} />
          <Icon
            name={isOpen ? "chevronUpNormal" : "chevronDownNormal"}
            size={24}
          />
        </Flex>
      </Flex>
      {isOpen && (
        <Flex w="100%" py={16} px={24}>
          <Text
            type={"Body1_Normal"}
            fontWeight={"400"}
            w={45}
          >{`A${index}.`}</Text>
          <Flex flexDir={"column"} flex={1}>
            <Text type={"Body1_Normal"} fontWeight={"400"}>
              {userAnswer}
            </Text>

            <Flex
              mt={24}
              borderRadius={12}
              bgColor={"Fill/Strong"}
              py={8}
              px={16}
              flexDir={"column"}
              flex={1}
            >
              {gptEvaluation.map(({ rationale, criteria, score }, idx) => {
                return (
                  <Flex flex={1} flexDir={"column"} key={criteria} pb={16}>
                    {idx !== 0 && (
                      <Flex
                        w="100%"
                        h={1}
                        bgColor={"Line/Normal/Strong"}
                        mb={8}
                      />
                    )}
                    {criteria ? (
                      <Flex alignItems={"center"}>
                        <Text type={"Body1_Normal"} fontWeight={"600"} mr={8}>
                          {criteria}
                        </Text>
                        <ScoreBadge size={"small"} score={Number(score)} />
                      </Flex>
                    ) : (
                      <Text type={"Body1_Normal"} fontWeight={"600"}>
                        평가 이유
                      </Text>
                    )}
                    <Text type={"Body1_Normal"} fontWeight={"500"} mt={8}>
                      {rationale}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default FeedbackItem;
