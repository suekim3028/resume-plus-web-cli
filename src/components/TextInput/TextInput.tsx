"use client";
import { Flex, Text } from "@uis";

import { SpaceProps } from "@chakra-ui/react";
import { ChangeEventHandler, useCallback, useRef, useState } from "react";
import Icon from "../Icon/Icon";

const TextInput = ({
  placeholder,
  title,
  validate,
  defaultValue,
  hidden: hiddenSetting,
  onStateChange,
  ...spaceProps
}: TextInputProps) => {
  const text = useRef("");

  const [hidden, setHidden] = useState(hiddenSetting);

  const defaultState: InputState = useRef({
    isError: false,
    errorText: "",
    text: defaultValue || "",
    isValidating: false,
  }).current;

  const [inputState, _setInputState] = useState<InputState>(defaultState);
  const inputStateRef = useRef<InputState>(defaultState);

  const setInputState = (state: InputState) => {
    inputStateRef.current = state;
    _setInputState(state);
    onStateChange && onStateChange(state);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      const text = e.target.value;
      if (!text) {
        setInputState(defaultState);
      }

      if (validate) {
        setInputState({ ...inputStateRef.current, isValidating: true });
        const { isError, errorText } = await validate(text);
        setInputState({ text, isError, isValidating: false, errorText });
      } else {
        setInputState({ ...defaultState, text });
      }
    },
    [validate]
  );

  return (
    <Flex direction="column" w="100%" {...spaceProps}>
      {!!title && (
        <Text
          type={"Body1_Normal"}
          fontWeight={"600"}
          color="Label/Alternative"
          mb={12}
        >
          {title}
        </Text>
      )}
      <Flex
        border="1px solid rgba(112, 115, 124, 0.52)"
        py={9}
        px={20}
        borderRadius={8}
        alignItems={"center"}
      >
        <input
          onChange={handleChange}
          type={hidden ? "password" : "text"}
          placeholder={placeholder}
          style={{
            fontFamily: "Pretendard JP",
            fontWeight: "400",
            fontSize: 15,
            lineHeight: "22.01px",
            color: "rgba(55, 56, 60, 0.61)",
            borderStyle: "none",
            display: "flex",
            flex: 1,
          }}
        />
        {hiddenSetting && (
          <Icon
            ml={10}
            name={hidden ? "normalEyeSlash" : "normalEye"}
            size={18}
            onClick={() => setHidden((p) => !p)}
          />
        )}
      </Flex>
      {!!inputState?.errorText && (
        <Flex flex={1} flexWrap={"wrap"} mt={12}>
          <Text
            type="Body1_Normal"
            color="Status/Negative"
            fontWeight={"500"}
            wordBreak={"break-all"}
            hidden={hidden}
          >
            aweifja;oeifj;aowiejfawefoija;eofija;fjiawa;oifjaw;oeijfa;oeifjao;eijfoa;
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

type TextInputProps = {
  title?: string;
  placeholder?: string;
  validate?: (text: string) => Promise<InputValidation>;
  defaultValue?: string;
  hidden?: boolean;
  onStateChange?: (state: InputState) => void;
} & SpaceProps;

export type InputValidation = {
  isError: boolean;
  errorText?: string;
};

type InputState = {
  isError: boolean;
  errorText?: string;
  text: string;
  isValidating: boolean;
};

export type TextInputRef = {};

export default TextInput;
