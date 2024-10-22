import { Icon } from "@components";
import { UI, WEBSITE_CONSTS } from "@constants";
import { Flex, Text } from "@uis";
import { Form } from "@web-core";
import { useCallback, useState } from "react";
import { InterviewSettingValue } from "../types";

const PrivacyAgreementCheckbox: Form.FormItemElement<
  InterviewSettingValue,
  "privacyAgreed"
> = (link) => {
  const [showPrivacyText, setShowPrivacyText] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(link.defaultValue);
  const { valueChangeHandler } = Form.useFormItem({
    link,
    validateFn: "boolean",
  });

  const handleClickCheckbox = useCallback(() => {
    setPrivacyAgreed((p) => {
      valueChangeHandler(!p);
      return !p;
    });
  }, [valueChangeHandler]);

  return (
    <Flex w={"100%"} flexDir={"column"} mt={24}>
      <Flex
        border={"1px solid rgba(112, 115, 124, 0.22)"}
        borderRadius={showPrivacyText ? "8px 8px 0px 0px" : 8}
        w="100%"
        alignItems={"center"}
        py={10.5}
        px={16}
        justifyContent={"space-between"}
      >
        <Flex
          alignItems={"center"}
          onClick={handleClickCheckbox}
          cursor={"pointer"}
        >
          <Icon
            name={
              privacyAgreed ? "normalCircleCheckPrimary" : "normalCircleCheck"
            }
            size={20}
          />
          <Text
            type="Body1_Normal"
            fontWeight={"600"}
            color="Primary/Normal"
            ml={4}
          >
            필수
          </Text>
          <Text
            type="Body1_Normal"
            fontWeight={"600"}
            color="Label/Normal"
            ml={10}
          >
            개인정보 수집 및 이용동의 약관
          </Text>
        </Flex>
        <Icon
          onClick={() => setShowPrivacyText((p) => !p)}
          name={showPrivacyText ? "chevronUpNormal" : "chevronDownNormal"}
          size={24}
        />
      </Flex>

      <Flex
        h={272}
        borderRadius={"0px 0px 8px 8px"}
        opacity={showPrivacyText ? 1 : 0}
        transformOrigin={"top"}
        transition={"opacity 0.3s ease-out, transform 0.3s ease-out"}
        overflowY={"scroll"}
        bgColor={"Background/Elevated/Alternative"}
        border={`1px solid ${UI.COLORS["Line/Normal/Normal"]}`}
        p={16}
        borderTop={"0px"}
      >
        <Text type="Body1_Normal" color="Label/Neutral" fontWeight={"400"}>
          {WEBSITE_CONSTS.PRIVACY_DATA_TEXT}
        </Text>
      </Flex>
    </Flex>
  );
};

export default PrivacyAgreementCheckbox;
