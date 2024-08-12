import { TextInput, TextInputRef } from "@components";
import { Flex } from "@uis";
import { inputUtils } from "@utils";
import { useRef } from "react";
import { SignUpInputProps } from "../types";

const PasswordInput = ({ onErrorChange, ...spaceProps }: SignUpInputProps) => {
  const password = useRef(""); // valid password만 유지
  const isPasswordConfirmed = useRef(false);

  const confirmPasswordInputRef = useRef<TextInputRef>(null);

  const checkIsError = () => {
    onErrorChange(
      password.current && isPasswordConfirmed.current
        ? {
            isError: false,
            value: password.current,
          }
        : {
            isError: true,
            value: null,
          }
    );
  };

  return (
    <Flex flexDir={"column"} w="100%">
      <TextInput
        helperText="8자 이상 16자 이하로 영문,숫자,특수문자를 3가지 이상 조합해주세요"
        title="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        mt={12}
        hidden
        onChange={(s) => {
          password.current = s.isError || s.isValidating ? "" : s.text;
          confirmPasswordInputRef.current?.validate();
          checkIsError();
        }}
        validate={inputUtils.validatePassword}
      />
      <TextInput
        ref={confirmPasswordInputRef}
        placeholder="비밀번호를 다시 한번 입력해주세요"
        mt={8}
        hidden
        onChange={(s) => {
          isPasswordConfirmed.current =
            s.isError || s.isValidating ? false : true;
          checkIsError();
        }}
        validate={async (cf) => {
          const confirmed = !!cf && cf === password.current;
          return {
            isError: !confirmed,
            errorText: confirmed ? "" : "비밀번호가 일치하지 않습니다",
          };
        }}
      />
    </Flex>
  );
};

export default PasswordInput;
