import { InputState, TextInput } from "@components";
import { inputUtils } from "@utils";
import React from "react";
import { SignUpInputProps } from "../types";

const NameInput = ({ onErrorChange, ...spaceProps }: SignUpInputProps) => {
  const handleOnChange = (state: InputState) => {
    if (state.isError) {
      onErrorChange("name", { isError: true, value: null });
    } else {
      onErrorChange("name", { isError: false, value: state.text });
    }
  };

  return (
    <TextInput
      title="이름"
      placeholder="이름을 입력해주세요"
      onChange={handleOnChange}
      validate={inputUtils.validateName}
      {...spaceProps}
    />
  );
};

export default React.memo(NameInput);
