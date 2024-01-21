import { Font, Icons, Layout as L } from "@design-system";
import { langStore } from "@store";
import { InterviewTypes } from "@types";
import { useRecoilState, useRecoilValue } from "recoil";

const LABEL: Record<InterviewTypes.Lang, string> = {
  ENG: "continue",
  KOR: "다음",
};

const GoNextButton = ({
  canGoNext,
  onClick,
  text,
}: {
  canGoNext: boolean;
  onClick: () => void;
  text?: Record<InterviewTypes.Lang, string>;
}) => {
  const _lang = useRecoilValue(langStore);
  const lang: InterviewTypes.Lang = _lang || "ENG";

  return (
    <L.FlexRow
      alignItems="center"
      w={"100%"}
      justifyContent="flex-end"
      gap={10}
    >
      <L.FlexRow
        onClick={canGoNext ? onClick : undefined}
        bgColor={canGoNext ? "PRIMARY_400" : "PRIMARY_100"}
        pv={15}
        // w={"70%"}
        ph={30}
        rounded={50}
        alignItems="center"
        justifyContent="center"
        hoverBgColor={canGoNext ? "PRIMARY_500" : undefined}
      >
        <Icons.FiArrowRight
          color={"white"}
          style={{ marginTop: 1, marginLeft: -2 }}
        />
        <Font.Body type={"16_semibold_single"} ml={2} color={"BASIC_WHITE"}>
          {text ? text[lang] : LABEL[lang]}
        </Font.Body>
      </L.FlexRow>
    </L.FlexRow>
  );
};

export default GoNextButton;
