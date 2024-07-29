import { companyDataStore } from "@store";
import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";
import { useRecoilValue } from "recoil";

const PendingResultCard = (result: InterviewTypes.PendingInterviewResult) => {
  const companyData = useRecoilValue(companyDataStore);
  const { companyId, jobId, departmentId, createdAt } = result;

  const company = companyData?.companies.find(({ id }) => id === companyId);
  const department = companyData?.departments.find(
    ({ id }) => id === departmentId
  );
  const job = companyData?.jobs.find(({ id }) => id === jobId);

  return (
    <Flex
      pt={32}
      px={16}
      pb={24}
      direction={"column"}
      flexShrink={0}
      onClick={() => alert("아직 분석중인 면접이에요...")}
      w={282}
      borderRadius={12}
      bgColor={"Interaction/Disable"}
    >
      <Flex w="100%" flex={0} h={128} mb={14}>
        <Flex
          w={128}
          h={128}
          flexShrink={0}
          rounded={10}
          bgRgbColor="rgba(217, 217, 217, 1)"
        ></Flex>
        <Flex
          direction={"column"}
          h={128}
          flex={1}
          pl={8}
          justifyContent={"center"}
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
        >
          <Text
            type="Body1_Normal"
            lineHeight={"100%"}
            fontWeight={"700"}
            mb={12}
            wordBreak={"break-all"}
            width={"100%"}
            color={"Label/Assistive"}
          >
            {company?.name || ""}
          </Text>

          <Text
            type="Body1_Normal"
            lineHeight={"100%"}
            fontWeight={"400"}
            width={"100%"}
            wordBreak={"break-all"}
            color={"Label/Assistive"}
            mb={4}
          >
            {department?.department || ""}
          </Text>

          <Text
            type="Body1_Normal"
            color={"Label/Assistive"}
            width={"100%"}
            lineHeight={"100%"}
            wordBreak={"break-all"}
            fontWeight={"400"}
          >
            {job?.job || ""}
          </Text>
        </Flex>
      </Flex>
      <Flex w="100%" justifyContent={"space-between"}>
        <Text type="Label2" fontWeight={"400"} color={"Label/Assistive"}>
          {createdAt}
        </Text>
      </Flex>
    </Flex>
  );
};

export default PendingResultCard;
