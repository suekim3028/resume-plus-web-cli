"use client";
import { Flex, Text } from "@uis";

import { SpaceProps } from "@chakra-ui/react";
import { UI } from "@constants";
import React, {
  ChangeEventHandler,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Icon from "../Icon/Icon";

const TextInputComponent: React.ForwardRefRenderFunction<
  TextInputRef,
  TextInputProps
> = (
  {
    placeholder,
    title,
    validate,
    defaultValue,
    hidden: hiddenSetting,
    onChange,
    disabled,
    ...spaceProps
  },
  ref
) => {
  const [hidden, setHidden] = useState(hiddenSetting);

  const defaultState: InputState = useRef({
    isError: false,
    errorText: "",
    text: defaultValue || "",
    isValidating: false,
  }).current;

  const [{ isError, isValidating, errorText, text }, _setInputState] =
    useState<InputState>(defaultState);
  const inputStateRef = useRef<InputState>(defaultState);
  const inputComponentRef = useRef<HTMLInputElement>(null);

  const setInputState = useCallback(
    (state: InputState) => {
      inputStateRef.current = state;
      _setInputState(state);
      onChange && onChange(state);
    },
    [onChange]
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      const value = e.target.value;
      if (!value) {
        setInputState(defaultState);
      }

      if (validate) {
        setInputState({ ...inputStateRef.current, isValidating: true });
        const { isError, errorText } = await validate(value);
        setInputState({ text: value, isError, isValidating: false, errorText });
      } else {
        setInputState({ ...defaultState, text: value });
      }
    },
    [validate, setInputState]
  );

  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        setValue: (text: string) => {
          if (inputComponentRef.current) {
            inputComponentRef.current.value = text;
          }
        },
      }),
      []
    )
  );

  console.log(errorText);
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
        py={9}
        borderWidth={1}
        borderStyle={"solid"}
        borderColor={
          !!text && isError
            ? UI.COLORS["Status/Negative"]
            : "rgba(112, 115, 124, 0.52)"
        }
        px={20}
        borderRadius={8}
        alignItems={"center"}
      >
        <input
          ref={inputComponentRef}
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
          disabled={disabled}
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
      {/* {isValidating && <>validating</>} */}

      {!!text && !isValidating && isError && !!errorText && (
        <Flex flex={1} flexWrap={"wrap"} mt={12}>
          <Text
            type="Body1_Normal"
            color="Status/Negative"
            fontWeight={"500"}
            wordBreak={"break-all"}
          >
            {errorText}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

const TextInput = React.forwardRef<TextInputRef, TextInputProps>(
  TextInputComponent
);

type TextInputProps = {
  title?: string;
  placeholder?: string;
  validate?: (text: string) => Promise<InputValidation>;
  defaultValue?: string;
  hidden?: boolean;
  onChange?: (state: InputState) => void;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
} & SpaceProps;

export type InputValidation = {
  isError: boolean;
  errorText?: string;
};

export type InputState = {
  isError: boolean;
  errorText?: string;
  text: string;
  isValidating: boolean;
};

export type TextInputRef = {
  setValue: (value: string) => void;
};

export default TextInput;
