import ScoreBadge from "@app/result/components/ScoreBadge";
import { UI } from "@constants";
import { Flex, Text } from "@uis";

const InterviewInfoCard = ({
  createdAt,
  companyName,
  jobName,
  departmentName,
  meanScore,
}: {
  createdAt: string;
  companyName: string;
  jobName: string;
  departmentName: string;
  meanScore: number;
}) => {
  return (
    <Flex
      direction={"column"}
      py={16}
      px={26}
      border={`2px solid ${UI.COLORS["Line/Normal/Strong"]}`}
      borderRadius={12}
      alignItems={"flex-start"}
      w="100%"
      flex={1}
    >
      <Flex w={128} h={128} borderRadius={10} bgColor={"Fill/Alternative"} />
      <Text
        type="Body1_Normal"
        fontWeight={"700"}
        mt={16}
        wordBreak={"break-all"}
      >
        {companyName}
      </Text>
      <Text
        type="Body1_Normal"
        fontWeight={"400"}
        mt={12}
        wordBreak={"break-all"}
      >
        {departmentName}
      </Text>
      <Text
        type="Body1_Normal"
        fontWeight={"400"}
        mt={4}
        mb={16}
        wordBreak={"break-all"}
      >
        {jobName}
      </Text>
      <ScoreBadge score={meanScore} size={"medium"} />
      <Text mt={16} type={"Label2"} fontWeight={"400"} wordBreak={"break-all"}>
        {createdAt}
      </Text>
    </Flex>
  );
};

export default InterviewInfoCard;
