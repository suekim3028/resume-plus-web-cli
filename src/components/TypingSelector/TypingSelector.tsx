"use client";
import { UI } from "@constants";
import { Flex, Text } from "@uis";
import React, {
  ReactElement,
  Ref,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

const TypingSelectorComponent = <T extends any>(
  props: TypingSelectorItemProps<T>,
  ref: Ref<TypingSelectorRef>
) => {
  const { itemList, placeholder, onSelect, onTypingSelect } = props;
  const [value, setValue] = useState("");

  const bottomList = useMemo(() => {
    return itemList.filter((v) => v.label.startsWith(value));
  }, [value]);

  const [showBottomList, setShowBottomList] = useState(false);

  const showTextSelector = useMemo(
    () => !itemList.find((v) => v.label === value),
    [value]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const close = () => {
    setShowBottomList(false);
  };

  const clear = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  useImperativeHandle(ref, () => ({ close, clear }));

  return (
    <Flex w="100%" position={"relative"}>
      <Flex
        cursor={"pointer"}
        px={8}
        py={10}
        w="100%"
        overflow={"hidden"}
        bgColor={"Background/Normal/Normal"}
        borderColor={
          UI.COLORS[!!bottomList.length ? "Label/Normal" : "Line/Normal/Normal"]
        }
        // borderBottomWidth={1}
        borderWidth={"0px 0px 1px 0px"}
        borderStyle={"solid"}
        justifyContent={"space-between"}
      >
        <input
          ref={inputRef}
          style={{
            fontFamily: "Pretendard JP Variable",
            fontSize: 16,
            lineHeight: "150%",
            borderStyle: "none",
            flex: 1,
          }}
          onChange={(e) => {
            const text = e.target.value;
            onSelect(null);
            setValue(text);
            setShowBottomList(!!text);
          }}
          placeholder={placeholder}
        />
      </Flex>

      {showBottomList && !!value && (
        <Flex
          position={"absolute"}
          direction={"column"}
          top={"100%"}
          left={0}
          right={0}
          zIndex={2}
          maxHeight={192}
          overflowY={"scroll"}
          boxShadow={"0px 1px 4px rgba(0, 0, 0, 0.08)"}
          bgColor={"Static/White"}
        >
          {showTextSelector && (
            <Flex
              px={8}
              py={6}
              cursor={"pointer"}
              onClick={() => {
                onTypingSelect(value);
                close();
              }}
            >
              <Text
                type={"Label1_Normal"}
                fontWeight={"500"}
                color={"Label/Alternative"}
              >
                {`'${value}' 사용하기`}
              </Text>
            </Flex>
          )}
          {bottomList.map((item) => (
            <Flex
              key={item.label}
              px={8}
              py={6}
              cursor={"pointer"}
              onClick={() => {
                if (inputRef.current) inputRef.current.value = item.label;
                onSelect(item.value);
                close();
              }}
            >
              <Text
                type={"Label1_Normal"}
                fontWeight={"500"}
                color={"Label/Normal"}
              >
                {item.label}
              </Text>
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

// Cast the output
const TypingSelector = React.forwardRef(TypingSelectorComponent) as <
  T extends any
>(
  p: TypingSelectorItemProps<T> & {
    ref?: Ref<TypingSelectorRef>;
  }
) => ReactElement;

export type TypingSelectorItem<T> = { label: string; value: T };
type TypingSelectorItemProps<T> = {
  itemList: TypingSelectorItem<T>[];
  placeholder: string;
  onSelect: (value: T | null) => void;
  onTypingSelect: (value: string) => void;
};

export type TypingSelectorRef = {
  close: () => void;
  clear: () => void;
};

export default TypingSelector;
// options has type { value: number; label: string; flag: boolean; }[]
// , so we have made FRefOutputComp generic!
