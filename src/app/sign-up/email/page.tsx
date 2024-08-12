"use client";
import { GridItem } from "@chakra-ui/react";
import { Icon, Logo } from "@components";
import { UI } from "@constants";
import { useUser } from "@hooks";
import { UserTypes } from "@types";
import { Button, Flex, GridWrapper, Text } from "@uis";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import EmailInput from "./components/EmailInput";
import NameInput from "./components/NameInput";
import PasswordInput from "./components/PasswordInput";
import { SignUpInputProps, SignUpInputValue } from "./types";

type SignUpValueKey = keyof UserTypes.SignUpUser;

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

  const { signUpWithEmail } = useUser();

  const inputValue = useRef<SignUpValueState>({
    email: { isError: true, value: null },
    name: { isError: true, value: null },
    password: { isError: true, value: null },
  });

  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [valueChecker, setValueChecker] = useState(true); // error check memoization refresh 위한 state

  const checkerFactory = useCallback(
    (type: SignUpValueKey): SignUpInputProps["onErrorChange"] => {
      return (v: SignUpInputValue) => {
        inputValue.current = { ...inputValue.current, [type]: v };

        setValueChecker((p) => !p);
      };
    },
    []
  );

  const submittableValue = useMemo((): false | UserTypes.SignUpUser => {
    const value = inputValue.current;
    if (!privacyAgreed || !isSubmittableValue(value)) return false;
    const { email, name, password } = value;

    console.log({
      email: email.value,
      name: name.value,
      password: password.value,
    });

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
          <NameInput mt={56} onErrorChange={checkerFactory("name")} />
          <EmailInput mt={12} onErrorChange={checkerFactory("email")} />
          <PasswordInput mt={12} onErrorChange={checkerFactory("password")} />

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
              쏘카 (이하 “회사”라 함)은(는) “Greeting” 을 통한 채용 절차 진행을
              위하여 귀하의 정보를 수집합니다. 1. 수집하는 개인정보의 필수항목
              •성명, 전화번호, 이메일 2. 개인정보처리의 목적 •채용 관련 안내,
              공지사항 전달, 채용 및 웹사이트 이용 관련 연락, 채용 적합성 판단
              및 서류심사/면접 등의 근거 자료, 인재 DB 활용 등 3. 보유기간 •접수
              지원 후 3년간, 단 정보주체의 삭제 요청이 있는 경우 지체없이 파기 ※
              회사는 본인이 작성/제출한 정보에 한하여 정보를 수집합니다.
              채용서비스의 특성상 민감한 정보 등이 수집될 수 있으니 작성/제출에
              유의하여 주시기 바랍니다. ※ 귀하는 개인 정보 수집ㆍ이용에 대한
              동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 원활한
              기업 측으로의 지원자 정보 전달을 진행할 수 없어 본건 서비스에
              제한을 받을 수 있습니다
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
