"use client";
import { UI } from "@constants";
import { Flex, Text } from "@uis";
import React, {
  ReactElement,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const TypingSelectorComponent = <T extends any>(
  props: TypingSelectorItemProps<T>,
  ref: Ref<TypingSelectorRef>
) => {
  const { itemList, placeholder, onSelect } = props;
  const [bottomList, setBottomList] = useState<TypingSelectorItem<T>[]>([]);

  const [selected, _setSelected] = useState<TypingSelectorItem<T> | null>(null);
  const setSelected = (value: TypingSelectorItem<T> | null) => {
    _setSelected(value);
    onSelect(value ? value.value : null);
  };
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const close = () => {
    console.log("close!");
    setBottomList([]);
  };

  useImperativeHandle(ref, () => ({ close }));

  return (
    <Flex w="100%" position={"relative"} py={20}>
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
            fontFamily: "Pretendard JP",
            fontSize: 16,
            lineHeight: "150%",
            borderStyle: "none",
            flex: 1,
          }}
          onChange={(e) => {
            const text = e.target.value;
            if (!text) {
              return setBottomList([]);
            }
            setBottomList(itemList.filter((v) => v.label.startsWith(text)));
          }}
          placeholder={placeholder}
        />
      </Flex>
      {!!bottomList.length && (
        <Flex
          position={"absolute"}
          direction={"column"}
          top={"100%"}
          left={0}
          right={0}
          zIndex={2}
          boxShadow={"0px 1px 4px rgba(0, 0, 0, 0.08)"}
          bgColor={"Static/White"}
        >
          {bottomList.map((item) => (
            <Flex
              key={item.label}
              px={8}
              py={6}
              cursor={"pointer"}
              onClick={() => {
                if (inputRef.current) inputRef.current.value = item.label;
                setSelected(item);
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
};

export default TypingSelector;
// options has type { value: number; label: string; flag: boolean; }[]
// , so we have made FRefOutputComp generic!
