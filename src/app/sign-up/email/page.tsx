"use client";
import { GridItem } from "@chakra-ui/react";
import { InputState, Logo, TextInput, TextInputRef } from "@components";
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
          />

          <TextInput
            placeholder="비밀번호를 다시 한번 입력해주세요"
            mt={8}
            hidden
            onChange={handleChangeState("passwordConfirmation")}
            validate={async (cf) => {
              console.log(inputValue.current.password.text, cf);
              const confirmed = !!cf && cf === inputValue.current.password.text;
              return {
                isError: !confirmed,
                errorText: confirmed ? "" : "비밀번호가 일치하지 않습니다",
              };
            }}
          />

          <Button
            type={"Solid_Primary"}
            size={"Large"}
            title={"회원가입"}
            stretch
            flexProps={{ mt: 32 }}
            disabled={!canSubmit}
          />
        </GridItem>
      </GridWrapper>
    </Flex>
  );
};

export default EmailSignIn;
