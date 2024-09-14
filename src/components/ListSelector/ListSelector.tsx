"use client";
import { UI } from "@constants";
import { Flex, Text } from "@uis";
import React, {
  ReactElement,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Icon from "../Icon/Icon";

const ListSelectorComponent = <T extends any>(
  props: ListSelectorItemProps<T>,
  ref: Ref<ListSelectorRef<T>>
) => {
  const { itemList, placeholder, onSelect, disabled, disabledMsg } = props;
  const [showList, setShowList] = useState(false);
  const [selected, _setSelected] = useState<ListSelectorItem<T> | null>(null);

  const [isError, setIsError] = useState(false);

  const setSelected = (value: ListSelectorItem<T> | null) => {
    _setSelected(value);
    onSelect(value ? value.value : null);
  };

  const close = () => {
    setShowList(false);
  };

  useEffect(() => {
    setIsError(false);
    if (disabled) {
      setSelected(null);
      setShowList(false);
    }
  }, [disabled]);

  const select = (item: ListSelectorItem<T> | null) => {
    setSelected(item);
    close();
  };

  useImperativeHandle(ref, () => ({ close, select }));

  return (
    <Flex w="100%" position={"relative"} py={20}>
      <Flex
        cursor={"pointer"}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (disabled) {
            setIsError(true);
            return;
          }
          setShowList((p) => !p);
        }}
        px={8}
        py={10}
        w="100%"
        overflow={"hidden"}
        bgColor={"Background/Normal/Normal"}
        borderColor={
          UI.COLORS[
            isError
              ? "Status/Negative"
              : showList
              ? "Label/Normal"
              : "Line/Normal/Normal"
          ]
        }
        // borderBottomWidth={1}
        borderWidth={"0px 0px 1px 0px"}
        borderStyle={"solid"}
        justifyContent={"space-between"}
      >
        <Text
          type="Body1_Normal"
          fontWeight={"400"}
          color={
            isError
              ? "Status/Negative"
              : selected
              ? "Label/Normal"
              : "Label/Assistive"
          }
        >
          {selected ? selected.label : placeholder}
        </Text>
        {isError ? (
          <Icon name={"chevronDownNegative"} size={24} />
        ) : selected ? (
          <Icon
            name={showList ? "chevronUpNormal" : "chevronDownNormal"}
            size={24}
          />
        ) : (
          <Icon
            name={showList ? "chevronUpAssistive" : "chevronDownAssistive"}
            size={24}
          />
        )}
      </Flex>
      {showList && (
        <Flex
          position={"absolute"}
          direction={"column"}
          top={"100%"}
          bgColor={"Static/White"}
          left={0}
          h={160}
          overflowY={"scroll"}
          right={0}
          zIndex={2}
          boxShadow={"0px 1px 4px rgba(0, 0, 0, 0.08)"}
        >
          {itemList.map((item) => (
            <Flex
              key={item.label}
              px={8}
              py={6}
              cursor={"pointer"}
              onClick={() => {
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
const ListSelector = React.forwardRef(ListSelectorComponent) as <T extends any>(
  p: ListSelectorItemProps<T> & {
    ref?: Ref<ListSelectorRef<T>>;
  }
) => ReactElement;

export type ListSelectorItem<T> = { label: string; value: T };
type ListSelectorItemProps<T> = {
  itemList: ListSelectorItem<T>[];
  placeholder: string;
  onSelect: (value: T | null) => void;
  disabled?: boolean;
  disabledMsg?: string;
};

export type ListSelectorRef<T> = {
  close: () => void;
  select: (item: ListSelectorItem<T> | null) => void;
};

export default ListSelector;
// options has type { value: number; label: string; flag: boolean; }[]
// , so we have made FRefOutputComp generic!
