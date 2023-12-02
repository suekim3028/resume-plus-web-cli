import { Icons, Layout as L } from "@design-system";
import * as S from "./TextInput.styles";
import { useChatMainContext } from "../../ChatMainContext";
import { useTheme } from "styled-components";
import { ChangeEventHandler, useCallback, useRef, useState } from "react";

const TextInput = () => {
  const { isLoading, step, answer } = useChatMainContext();
  const theme = useTheme();

  const editable = !isLoading && (step == "PERSONAL_Q" || step == "COMMON_Q");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [hasValue, setHasValue] = useState(false);

  const handleOnChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      setHasValue(!!e.target.value);
    },
    []
  );

  const handleClickSend = () => {
    const text = inputRef.current?.value;
    if (!text) return;
    answer(text);
    setHasValue(false);
    inputRef.current.value = "";
  };

  if (!editable) return <></>;
  return (
    <L.FlexRow w={"100%"} ph={20} pv={20} alignItems="flex-end">
      <S.Input disabled={!editable} onChange={handleOnChange} ref={inputRef} />
      <L.LayoutBase
        onClick={handleClickSend}
        ml={10}
        w={40}
        h={40}
        rounded={50}
        bgColor={hasValue ? "secondary" : "surfaceContainerHigh"}
        alignItems="center"
        justifyContent="center"
        hoverBgColor={hasValue ? "onSecondaryContainer" : undefined}
      >
        <L.LayoutBase ml={-2}>
          <Icons.FiSend color={theme["onSecondary"]} />
        </L.LayoutBase>
      </L.LayoutBase>
    </L.FlexRow>
  );
};

export default TextInput;
