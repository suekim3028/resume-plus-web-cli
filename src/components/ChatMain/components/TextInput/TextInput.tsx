import { Icons, Layout as L } from "@design-system";
import * as S from "./TextInput.styles";
import { useChatMainContext } from "../../ChatMainContext";
import { useTheme } from "styled-components";

const TextInput = () => {
  const { isLoading, step } = useChatMainContext();
  const theme = useTheme();

  const editable = !isLoading && (step == "PERSONAL_Q" || step == "COMMON_Q");

  if (!editable) return <></>;
  return (
    <L.FlexRow w={"100%"} ph={20} pt={20} alignItems="flex-end">
      <S.Input disabled={!editable} />
      <L.LayoutBase
        ml={10}
        w={40}
        h={40}
        rounded={50}
        bgColor={"secondary"}
        alignItems="center"
        justifyContent="center"
        hoverBgColor="onSecondaryContainer"
      >
        <L.LayoutBase ml={-2}>
          <Icons.FiSend color={theme["onSecondary"]} />
        </L.LayoutBase>
      </L.LayoutBase>
    </L.FlexRow>
  );
};

export default TextInput;
