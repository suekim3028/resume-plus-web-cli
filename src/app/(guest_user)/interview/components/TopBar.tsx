import { CompanyThumbnail } from "@components";
import { Flex, Text } from "@uis";
import { useInterviewContext } from "../InterviewContext";
import InterviewTimer from "./InterviewTimer";

const TopBar = () => {
  const { interviewInfo, setStatus } = useInterviewContext();
  const { company, department, companyThumbnailUrl } = interviewInfo;

  const handleOnTimeEnd = () => {
    setStatus("FORCE_END");
  };
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

      <InterviewTimer onTimeEnd={handleOnTimeEnd} />
    </Flex>
  );
};

export default TopBar;
