import { InputState, TextInput } from "@components";
import { inputUtils } from "@utils";
import { SignUpInputProps } from "../types";

const NameInput = ({ onErrorChange, ...spaceProps }: SignUpInputProps) => {
  const handleOnChange = (state: InputState) => {
    if (state.isError) {
      onErrorChange({ isError: true, value: null });
    } else {
      onErrorChange({ isError: false, value: state.text });
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

export default NameInput;
