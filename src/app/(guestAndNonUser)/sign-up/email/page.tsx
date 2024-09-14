"use client";
import { GridItem } from "@chakra-ui/react";
import { Icon, Logo } from "@components";
import { UI, WEBSITE_CONSTS } from "@constants";

import { useAuth } from "@hooks";
import { UserTypes } from "@types";
import { Button, Flex, GridWrapper, Text } from "@uis";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import EmailInput from "./components/EmailInput";
import NameInput from "./components/NameInput";
import PasswordInput from "./components/PasswordInput";
import { SignUpInputProps, SignUpInputValue, SignUpValueKey } from "./types";

type SignUpValueState = {
  [k in SignUpValueKey]: SignUpInputValue;
};

const isSubmittableValue = (
  value: SignUpValueState
): value is Record<SignUpValueKey, { isError: false; value: string }> => {
  return Object.values(value).every((v) => !v.isError && !!v.value);
};

const EmailSignIn = () => {
  const router = useRouter();

  const { signUpWithEmail } = useAuth();

  const inputValue = useRef<SignUpValueState>({
    email: { isError: true, value: null },
    name: { isError: true, value: null },
    password: { isError: true, value: null },
  });

  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [valueChecker, setValueChecker] = useState(true); // error check memoization refresh 위한 state

  const handleErrorChange: SignUpInputProps["onErrorChange"] = useCallback(
    (type, v) => {
      inputValue.current = { ...inputValue.current, [type]: v };
      setValueChecker((p) => !p);
    },
    []
  );

  const submittableValue = useMemo((): false | UserTypes.SignUpUser => {
    const value = inputValue.current;
    if (!privacyAgreed || !isSubmittableValue(value)) return false;
    const { email, name, password } = value;

    return { email: email.value, name: name.value, password: password.value };
  }, [valueChecker, privacyAgreed]);

  const submit = async () => {
    if (!submittableValue) return;
    // TODO: loading
    await signUpWithEmail(submittableValue);
    router.replace("/");
  };

  return (
    <Flex flex={1} alignItems={"center"} justifyContent={"center"}>
      <GridWrapper>
        <GridItem
          colSpan={4}
          colStart={5}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex alignSelf={"flex-start"}>
            <Logo size={"MEDIUM"} />
          </Flex>
          <NameInput mt={56} onErrorChange={handleErrorChange} />
          <EmailInput mt={12} onErrorChange={handleErrorChange} />
          <PasswordInput mt={12} onErrorChange={handleErrorChange} />

          <Flex
            w="100%"
            mt={24}
            alignItems={"center"}
            py={4}
            onClick={() => setPrivacyAgreed((p) => !p)}
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
              color="Label/Alternative"
              ml={10}
            >
              개인정보 수집 및 이용동의 약관
            </Text>
          </Flex>
          <Flex
            h={56}
            py={4}
            px={17}
            mt={16}
            overflowY={"scroll"}
            rounded={8}
            bgColor={"Background/Elevated/Alternative"}
            border={`1px solid ${UI.COLORS["Line/Normal/Strong"]}`}
          >
            <Text type="Caption2" color="Label/Neutral" fontWeight={"400"}>
              {WEBSITE_CONSTS.PRIVACY_DATA_TEXT}
            </Text>
          </Flex>

          <Button
            type={"Solid_Primary"}
            size={"Large"}
            title={"회원가입"}
            stretch
            flexProps={{ mt: 32 }}
            disabled={!submittableValue}
            onClick={submit}
          />
        </GridItem>
      </GridWrapper>
    </Flex>
  );
};

export default EmailSignIn;
