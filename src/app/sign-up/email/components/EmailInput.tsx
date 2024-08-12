import { TextInput, TextInputRef } from "@components";
import { Button, Flex, Text } from "@uis";
import { inputUtils } from "@utils";
import { useRef, useState } from "react";
import { SignUpInputProps } from "../types";

type AuthNumberState =
  | "1_CAN_NOT_SEND" // 인증번호 못보내는 상황. 이메일 error
  | "2_CAN_SEND" // 인증번호 보내기 가능
  | "3_WAITING" // 인증번호 보낸 후 확인 기다림
  | "4_CAN_RESEND" // 인증번호 보낸 후 일정시간 지나 재전송 가능
  | "5_CONFIRMED"; // 인증번호 확인 완료

const EmailInput = ({ onErrorChange, ...spaceProps }: SignUpInputProps) => {
  const authNumberInputRef = useRef<TextInputRef>(null);

  const emailValue = useRef(""); // valid 한 이메일만 유지
  const authNumber = useRef(""); // valid한 이메일만 유지

  const [authNumberState, _setAuthNumberState] =
    useState<AuthNumberState>("1_CAN_NOT_SEND");
  const authNumberStateRef = useRef<AuthNumberState>("1_CAN_NOT_SEND");

  const [canCheckAuthNumber, setCanCheckAuthNumber] = useState(false);

  const setAuthNumberState = (state: AuthNumberState) => {
    _setAuthNumberState(state);
    authNumberStateRef.current = state;
    onErrorChange(
      state === "5_CONFIRMED"
        ? { isError: false, value: emailValue.current }
        : { isError: true, value: null }
    );
  };

  const sendAuthNumber = () => {
    setAuthNumberState("3_WAITING");
    // TODO: send auth number api
  };

  const resetAuthNumber = () => {
    authNumberInputRef.current?.setValue("");
    setAuthNumberState("1_CAN_NOT_SEND");
  };

  const checkAuthNumber = () => {
    const authNumber = authNumberInputRef.current?.getValue() || "";
    if (!authNumber) return;

    // TODO: 체크
    setAuthNumberState("5_CONFIRMED");
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
              emailValue.current = isEmailValid ? state.text : "";
            }}
            validate={inputUtils.validateEmail}
          />
        </Flex>

        <Button
          onClick={sendAuthNumber}
          disabled={
            !(
              authNumberState === "2_CAN_SEND" ||
              authNumberState === "4_CAN_RESEND"
            )
          }
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
            disabled={
              !(
                authNumberState === "3_WAITING" ||
                authNumberState === "4_CAN_RESEND"
              )
            }
            placeholder="인증번호를 입력해주세요"
            onChange={(v) => {
              authNumber.current = v.text;
              setCanCheckAuthNumber(!!v.text);
            }}
          />
        </Flex>
        <Button
          title="확인"
          disabled={!canCheckAuthNumber}
          onClick={checkAuthNumber}
          type="Solid_Primary"
          size="Medium"
          flexProps={{ ml: 8 }}
        />
      </Flex>
    </Flex>
  );
};

export default EmailInput;
