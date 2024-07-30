import ScoreBadge from "@app/result/components/ScoreBadge";
import { isScoreEvaluation } from "@app/result/utils";
import { Icon } from "@components";
import { UI } from "@constants";
import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";
import { useState } from "react";

const FeedbackItem = ({
  question,
  user_answer,
  evaluation,
  index,
}: InterviewTypes.Feedback & { index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const score = (() => {
    if (isScoreEvaluation(evaluation)) {
      return evaluation.score;
    } else {
      if (!Object.keys.length) return 0;
      return (
        Object.values(evaluation).reduce(
          (prev, curr) => prev + Number(curr[0]),
          0
        ) / Object.keys(evaluation).length
      );
    }
  })();

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
              {user_answer}
            </Text>
            {isScoreEvaluation(evaluation) ? (
              <Flex
                mt={24}
                borderRadius={12}
                bgColor={"Fill/Strong"}
                flex={1}
                py={8}
                px={16}
                flexDir={"column"}
              >
                <Text type={"Body1_Normal"} fontWeight={"600"}>
                  평가 이유
                </Text>
                <Text type={"Body1_Normal"} fontWeight={"500"} mt={8}>
                  {evaluation.rationale}
                </Text>
              </Flex>
            ) : (
              <Flex
                mt={24}
                borderRadius={12}
                bgColor={"Fill/Strong"}
                py={8}
                px={16}
                flexDir={"column"}
                flex={1}
              >
                {Object.entries(evaluation).map(
                  ([criteria, [_score, rationale]], idx) => {
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
                        <Flex alignItems={"center"}>
                          <Text type={"Body1_Normal"} fontWeight={"600"} mr={8}>
                            {criteria}
                          </Text>
                          <ScoreBadge size={"small"} score={Number(_score)} />
                        </Flex>
                        <Text type={"Body1_Normal"} fontWeight={"500"} mt={8}>
                          {rationale}
                        </Text>
                      </Flex>
                    );
                  }
                )}
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default FeedbackItem;
