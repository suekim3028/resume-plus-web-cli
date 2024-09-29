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
    hideErrorText,
    disabled,
    helperText,
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

  const currentValue = useRef(defaultValue || "");

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

  const _validate = async (value: string) => {
    if (validate) {
      setInputState({
        ...inputStateRef.current,
        isError: false,
        isValidating: true,
      });
      const { isError, errorText } = await validate(value);

      if (value === currentValue.current)
        setInputState({
          text: value,
          isError,
          isValidating: false,
          errorText,
        });
    } else {
      setInputState({ ...defaultState, text: value });
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      const value = e.target.value;
      currentValue.current = value;
      if (!currentValue.current) {
        setInputState(defaultState);
      }

      _validate(value);
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
        getValue: () => inputComponentRef.current?.value || "",
        validate: () => _validate(inputStateRef.current.text),
      }),
      []
    )
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
        height={40}
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
            fontFamily: "Pretendard",
            fontWeight: "400",
            fontSize: 15,
            lineHeight: "22.01px",
            color: UI.COLORS["Label/Normal"],
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

      {!!text && !isValidating && isError && !!errorText && !hideErrorText ? (
        <Flex flex={1} flexWrap={"wrap"} mt={4}>
          <Text
            type="Caption2"
            color="Status/Negative"
            fontWeight={"500"}
            wordBreak={"break-all"}
          >
            {errorText}
          </Text>
        </Flex>
      ) : (
        helperText && (
          <Flex flex={1} flexWrap={"wrap"} mt={4}>
            <Text
              type="Caption2"
              color="Label/Assistive"
              fontWeight={"400"}
              wordBreak={"break-all"}
            >
              {helperText}
            </Text>
          </Flex>
        )
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
  helperText?: string;
  hideErrorText?: boolean;
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
  getValue: () => string;
  validate: () => void;
};

export default TextInput;
