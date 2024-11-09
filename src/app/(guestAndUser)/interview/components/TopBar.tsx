import { Flex, Text } from "@uis";
import { useInterviewDetailSetting } from "../[slug]/contexts/InterviewDetailSettingContext";
import InterviewTimer from "./InterviewTimer";

const TopBar = () => {
  const { companyName, department, renderCompanyThumbnail } =
    useInterviewDetailSetting();

  return (
    <Flex
      px={15}
      py={8}
      justifyContent={"space-between"}
      bgColor={"Line/Solid/Normal"}
      zIndex={2}
      alignItems={"center"}
    >
      <Flex alignItems={"center"} gap={48}>
        {renderCompanyThumbnail("small")}

        <Text
          type="Body1_Normal"
          color={"Label/Alternative"}
          fontWeight={"600"}
        >
          {companyName}
        </Text>
        <Text
          type="Body1_Normal"
          color={"Label/Alternative"}
          fontWeight={"600"}
        >
          {department.department}
        </Text>
      </Flex>

      <InterviewTimer />
    </Flex>
  );
};

export default TopBar;
