"use client";
import { GridItem } from "@chakra-ui/react";
import { Icon, InputState, Logo, TextInput, TextInputRef } from "@components";
import { UI } from "@constants";
import { useUser } from "@hooks";
import { UserTypes } from "@types";
import { Button, Flex, GridWrapper, Text } from "@uis";
import { inputUtils } from "@utils";
import { useCallback, useRef, useState } from "react";

type InputKey =
  | keyof UserTypes.SignUpUser
  | "passwordConfirmation"
  | "authNumber";

type SignUpValueState = Record<
  InputKey,
  Pick<InputState, "isError" | "text" | "isValidating">
>;

const EmailSignIn = () => {
  const [canSubmit, setCanSubmit] = useState({
    email: false,
    authNumber: false,
    all: false,
  });

  const { signUpWithEmail } = useUser();
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  const [authNumberState, _setAuthNumberState] = useState<
    "DEFAULT" | "WAITING" | "CONFIRMED"
  >("DEFAULT");
  const authNumberStateRef = useRef<"DEFAULT" | "WAITING" | "CONFIRMED">(
    "DEFAULT"
  );

  const setAuthNumberState = (state: "DEFAULT" | "WAITING" | "CONFIRMED") => {
    _setAuthNumberState(state);
    authNumberStateRef.current = state;
  };

  const authNumberInputRef = useRef<TextInputRef>(null);

  const inputValue = useRef<SignUpValueState>({
    email: { isError: false, text: "", isValidating: false },
    password: { isError: false, text: "", isValidating: false },
    name: { isError: false, text: "", isValidating: false },
    authNumber: { isError: false, text: "", isValidating: false },
    passwordConfirmation: { isError: false, text: "", isValidating: false },
  });

  const checkSubmitPossibleByKey = useCallback((key: InputKey) => {
    return (
      !inputValue.current[key].isError &&
      !!inputValue.current[key].text &&
      !inputValue.current[key].isValidating
    );
  }, []);

  const checkSubmitPossible = useCallback(() => {
    const _canSubmit =
      (Object.keys(inputValue.current) as InputKey[]).every(
        checkSubmitPossibleByKey
      ) && authNumberStateRef.current === "CONFIRMED";

    const canSubmitEmail = checkSubmitPossibleByKey("email");
    const canSubmitAuthNumber = checkSubmitPossibleByKey("authNumber");

    setCanSubmit({
      all: _canSubmit,
      email: canSubmitEmail && authNumberStateRef.current === "DEFAULT",
      authNumber:
        authNumberStateRef.current === "WAITING" && canSubmitAuthNumber,
    });
  }, []);

  const sendAuthNumber = () => {
    setAuthNumberState("WAITING");
    // send auth number api
    setCanSubmit((p) => ({ ...p, authNumber: false, email: false }));
  };

  const checkAuthNumber = () => {
    const authNumber = inputValue.current.authNumber;
    setAuthNumberState("CONFIRMED");
  };

  const handleChangeState = useCallback(
    (type: keyof typeof inputValue.current) => (state: InputState) => {
      inputValue.current = { ...inputValue.current, [type]: state };
      checkSubmitPossible();
    },
    [checkSubmitPossible]
  );

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
          <Logo />
          <TextInput
            title="이름"
            placeholder="이름을 입력해주세요"
            mt={56}
            onChange={handleChangeState("name")}
            validate={inputUtils.validateName}
          />
          <Flex flexDir="column" w="100%" mt={12}>
            <Text
              type={"Body1_Normal"}
              fontWeight={"600"}
              color="Label/Alternative"
              mb={12}
            >
              이메일
            </Text>
            <Flex w="100%">
              <Flex flex={1}>
                <TextInput
                  placeholder="이메일을 입력해주세요"
                  disabled={authNumberState === "CONFIRMED"}
                  onChange={(state) => {
                    authNumberInputRef.current?.setValue("");
                    setAuthNumberState("DEFAULT");
                    handleChangeState("email")(state);
                  }}
                  validate={inputUtils.validateEmail}
                />
              </Flex>

              <Button
                onClick={sendAuthNumber}
                disabled={!canSubmit.email}
                title="인증번호 받기"
                type="Solid_Primary"
                size="Medium"
                flexProps={{ px: 11.5, ml: 8 }}
              />
            </Flex>
            <Flex w="100%" mt={8}>
              <Flex flex={1}>
                <TextInput
                  ref={authNumberInputRef}
                  disabled={authNumberState !== "WAITING"}
                  placeholder="인증번호를 입력해주세요"
                  onChange={handleChangeState("authNumber")}
                />
              </Flex>
              <Button
                title="확인"
                disabled={
                  !canSubmit.authNumber || authNumberState !== "WAITING"
                }
                onClick={checkAuthNumber}
                type="Solid_Primary"
                size="Medium"
                flexProps={{ ml: 8 }}
              />
            </Flex>
          </Flex>

          <TextInput
            title="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            mt={12}
            hidden
            onChange={handleChangeState("password")}
            validate={inputUtils.validatePassword}
          />

          <TextInput
            placeholder="비밀번호를 다시 한번 입력해주세요"
            mt={8}
            hidden
            onChange={handleChangeState("passwordConfirmation")}
            validate={async (cf) => {
              const confirmed = !!cf && cf === inputValue.current.password.text;
              return {
                isError: !confirmed,
                errorText: confirmed ? "" : "비밀번호가 일치하지 않습니다",
              };
            }}
          />

          <Flex
            w="100%"
            mt={24}
            alignItems={"center"}
            py={4}
            onClick={() => setAgreedPrivacy((p) => !p)}
            cursor={"pointer"}
          >
            <Icon
              name={
                agreedPrivacy ? "normalCircleCheckPrimary" : "normalCircleCheck"
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
            disabled={!canSubmit.all || !agreedPrivacy}
            onClick={() => {
              const { email, name, password } = inputValue.current;

              console.log({
                email: email.text,
                name: name.text,
                password: password.text,
              });
              signUpWithEmail({
                email: email.text,
                name: name.text,
                password: password.text,
              });
            }}
          />
        </GridItem>
      </GridWrapper>
    </Flex>
  );
};

export default EmailSignIn;
