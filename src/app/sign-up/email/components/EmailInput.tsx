"use client";
import { userApis } from "@apis";
import { TextInput, TextInputRef } from "@components";
import { Button, Flex, Text } from "@uis";
import { inputUtils } from "@utils";
import { commonHooks } from "@web-core";
import React, { useEffect, useRef, useState } from "react";
import { SignUpInputProps } from "../types";

type AuthNumberState =
  | "1_CAN_NOT_SEND" // 인증번호 못보내는 상황. 이메일 error
  | "2_CAN_SEND" // 인증번호 보내기 가능
  | "3_WAITING" // 인증번호 보낸 후 확인 기다림
  | "4_CONFIRMED"; // 인증번호 확인 완료

const EmailInput = ({ onErrorChange, ...spaceProps }: SignUpInputProps) => {
  const authNumberInputRef = useRef<TextInputRef>(null);

  const emailValue = useRef(""); // valid 한 이메일만 유지
  const typedAuthNumber = useRef(""); // valid한 이메일만 유지
  const authNumber = useRef(""); // 인증번호 답

  const [authNumberState, _setAuthNumberState] =
    useState<AuthNumberState>("1_CAN_NOT_SEND");
  const authNumberStateRef = useRef<AuthNumberState>("1_CAN_NOT_SEND");

  const [canCheckAuthNumber, setCanCheckAuthNumber] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const setAuthNumberState = (state: AuthNumberState) => {
    _setAuthNumberState(state);
    authNumberStateRef.current = state;
    onErrorChange(
      "email",
      state === "4_CONFIRMED"
        ? { isError: false, value: emailValue.current }
        : { isError: true, value: null }
    );
  };

  const sendAuthNumber = async () => {
    setAuthNumberState("3_WAITING");

    const { isError, data } = await userApis.sendVerificationCode({
      email: emailValue.current,
    });
    if (isError) {
      return setAuthNumberState("2_CAN_SEND");
    }

    authNumber.current = data.verificationCode;
  };

  const checkAuthNumber = () => {
    const authNumber = authNumberInputRef.current?.getValue() || "";
    if (!authNumber) return;

    // TODO: 체크
    setAuthNumberState("4_CONFIRMED");
  };

  return (
    <Flex flexDir="column" w="100%" {...spaceProps}>
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
            onChange={(state) => {
              authNumberInputRef.current?.setValue("");
              const isEmailValid = !state.isError && !state.isValidating;
              setAuthNumberState(
                isEmailValid ? "2_CAN_SEND" : "1_CAN_NOT_SEND"
              );
              setCanCheckAuthNumber(false);
              emailValue.current = isEmailValid ? state.text : "";
              setErrorMessage(
                state.isError && !!state.text ? state.errorText || "" : ""
              );
            }}
            hideErrorText
            validate={inputUtils.validateEmail}
          />
        </Flex>

        <Button
          onClick={sendAuthNumber}
          disabled={
            !(
              authNumberState === "2_CAN_SEND" ||
              authNumberState === "3_WAITING"
            )
          }
          title={
            authNumberState === "3_WAITING" || authNumberState === "4_CONFIRMED"
              ? "재전송"
              : "인증번호 받기"
          }
          type="Solid_Primary"
          size="Medium"
          flexProps={{
            px: 11.5,
            ml: 8,
            bgColor:
              authNumberState === "3_WAITING"
                ? "Interaction/Disable"
                : undefined,
          }}
          textProps={{
            color:
              authNumberState === "3_WAITING" ? "Label/Assistive" : undefined,
          }}
        />
      </Flex>
      <Flex w="100%" mt={8}>
        <Flex flex={1}>
          <TextInput
            ref={authNumberInputRef}
            disabled={authNumberState !== "3_WAITING"}
            placeholder="인증번호를 입력해주세요"
            hideErrorText
            onChange={(v) => {
              typedAuthNumber.current = v.text;
              setCanCheckAuthNumber(!!v.text && !v.isError);
              setErrorMessage(v.isError && v.text ? v.errorText || "" : "");
            }}
            validate={async (text) =>
              text === authNumber.current
                ? { isError: false }
                : { isError: true, errorText: "올바르지 않은 인증번호입니다" }
            }
          />
        </Flex>
        <Button
          title={authNumberState === "4_CONFIRMED" ? "" : "확인"}
          leftIcon={
            authNumberState === "4_CONFIRMED" ? "normalCheck" : undefined
          }
          disabled={!canCheckAuthNumber || authNumberState == "4_CONFIRMED"}
          onClick={checkAuthNumber}
          type="Solid_Primary"
          size="Medium"
          flexProps={{
            ml: 8,
            py: authNumberState === "4_CONFIRMED" ? 11 : 9,
            bgColor:
              authNumberState === "4_CONFIRMED" ? "Primary/Normal" : undefined,
          }}
        />
      </Flex>
      {errorMessage && (
        <Flex flex={1} flexWrap={"wrap"} mt={4}>
          <Text
            type="Caption2"
            color="Status/Negative"
            fontWeight={"500"}
            wordBreak={"break-all"}
          >
            {errorMessage}
          </Text>
        </Flex>
      )}
      {authNumberState === "3_WAITING" && (
        <Timer
          onEnd={() => {
            authNumberInputRef.current?.setValue("");
            setAuthNumberState("2_CAN_SEND");
          }}
          visible={!errorMessage}
        />
      )}
    </Flex>
  );
};

const Timer = ({ onEnd, visible }: { onEnd: () => void; visible: boolean }) => {
  const [leftSeconds, setLeftSeconds] = useState(300);

  commonHooks.useSecondEffect(300, (second) => {
    setLeftSeconds((t) => t - 1);
  });

  useEffect(() => {
    if (leftSeconds === 0) onEnd();
  }, [leftSeconds === 0]);

  if (!visible) return <></>;

  return (
    <Flex flex={1} flexWrap={"wrap"} mt={4}>
      <Text
        type="Caption2"
        color="Status/Negative"
        fontWeight={"500"}
        wordBreak={"break-all"}
      >
        {`유효시간 : ${Math.floor(leftSeconds / 60)
          .toString()
          .padStart(2, "0")}분 ${(leftSeconds % 60)
          .toString()
          .padStart(2, "0")}초`}
      </Text>
    </Flex>
  );
};

export default React.memo(EmailInput);
