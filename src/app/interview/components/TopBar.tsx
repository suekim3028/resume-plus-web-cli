import { CompanyThumbnail } from "@components";
import { Flex, Text } from "@uis";
import { useInterviewContext } from "../InterviewContext";

const TopBar = () => {
  const { interviewInfo } = useInterviewContext();
  const { company, department, companyThumbnailUrl } = interviewInfo;
  return (
    <Flex
      px={16}
      justifyContent={"space-between"}
      bgColor={"Line/Solid/Normal"}
      zIndex={2}
      alignItems={"center"}
    >
      <Flex alignItems={"center"} gap={12}>
        <CompanyThumbnail
          size={64}
          companyName={company}
          thumbnailUrl={companyThumbnailUrl || undefined}
        />

        <Text
          type="Body1_Normal"
          color={"Label/Alternative"}
          fontWeight={"600"}
        >
          {company}
        </Text>
        <Text
          type="Body1_Normal"
          color={"Label/Alternative"}
          fontWeight={"600"}
        >
          {department}
        </Text>
      </Flex>
      <Flex alignItems={"center"} gap={16}>
        <Text
          type="Body1_Normal"
          color={"Label/Alternative"}
          fontWeight={"600"}
        >
          {"00:00"}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TopBar;
