import { Icons, Layout as L } from "@design-system";
import * as S from "./TextInput.styles";
import { useChatMainContext } from "../../ChatMainContext";
import { useTheme } from "styled-components";
import { ChangeEventHandler, useCallback, useRef, useState } from "react";

const TextInput = () => {
  const { isLoading, step, answer, isAfterStep } = useChatMainContext();
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

  if (isAfterStep("EVALUATION")) return <></>;
  return (
    <L.FlexRow w={"100%"} ph={20} pv={20} alignItems="flex-end">
      <S.Input
        disabled={!editable}
        onChange={handleOnChange}
        ref={inputRef}
        placeholder={
          editable
            ? "Your answer here..."
            : isLoading
            ? "Generating personalized questions. Please wait..."
            : "Upload your CV to get started..."
        }
      />
      <L.LayoutBase
        onClick={handleClickSend}
        ml={10}
        w={50}
        h={50}
        rounded={50}
        bgColor={hasValue ? "PRIMARY_400" : "PRIMARY_100"}
        alignItems="center"
        justifyContent="center"
        hoverBgColor={hasValue ? "PRIMARY_500" : undefined}
      >
        <L.LayoutBase ml={-2}>
          <Icons.FiSend color={theme["BASIC_WHITE"]} size={22} />
        </L.LayoutBase>
      </L.LayoutBase>
    </L.FlexRow>
  );
};

export default TextInput;
