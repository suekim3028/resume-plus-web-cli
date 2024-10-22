import { EventLogger } from "@components";
import { Button, Flex, Text } from "@uis";
import { InterviewSettingValue } from "../types";

const ConfirmPopup = ({
  value,
  onClickConfirmButton,
  onClickCloseButton,
}: {
  value: InterviewSettingValue;
  onClickConfirmButton: () => void;
  onClickCloseButton: () => void;
}) => {
  const { company, job, department, resume } = value;
  return (
    <Flex
      borderRadius={16}
      w={480}
      bgColor={"Background/Normal/Alternative"}
      px={40}
      pt={20}
      pb={17}
      flexDir={"column"}
      alignItems={"center"}
    >
      <Text type={"Heading1"} fontWeight={"600"} color={"Label/Neutral"}>
        입력한 내용을 마지막으로 확인해주세요
      </Text>
      <Flex
        w="100%"
        py={4}
        px={14}
        bgColor={"Static/White"}
        borderRadius={8}
        mt={12}
        gap={16}
        flexDir={"column"}
      >
        <Row
          title={"지원 직무"}
          body={`${
            typeof company === "string" ? company : company.companyName
          } > ${department.department} > ${job.companyJob}`}
        />
        <Row title={"면접 유형"} body={"1차 > 실무진 > 일반 > 1:1 "} />
        <Row title={"이력서 및 경력기술서"} body={resume.name} />
      </Flex>
      <Flex gap={16} mt={12}>
        <Button
          size={"Large"}
          type={"Outlined_Secondary"}
          title={"다시 입력"}
          onClick={() => {
            onClickCloseButton();
            EventLogger.log("interview_setting_popup_button", "다시 입력");
          }}
          flexProps={{
            width: 116,
            height: 48,
            padding: 0,
            bgColor: "Transparent",
          }}
        />
        <Button
          size={"Large"}
          type={"Solid_Primary"}
          title={"면접 시작"}
          flexProps={{ width: 116, height: 48, padding: 0 }}
          onClick={() => {
            onClickConfirmButton();
            EventLogger.log("interview_setting_popup_button", "면접 시작");
          }}
        />
      </Flex>
    </Flex>
  );
};

const Row = ({ title, body }: { title: string; body: string }) => {
  return (
    <Flex flexDir={"column"} w="100%">
      <Text
        type={"Body1_Normal"}
        color={"Primary/Normal"}
        fontWeight={"600"}
        my={4}
      >
        {title}
      </Text>
      <Text
        type={"Label2"}
        color={"Label/Alternative"}
        fontWeight={"500"}
        my={4}
      >
        {body}
      </Text>
    </Flex>
  );
};

export default ConfirmPopup;
