import { INTERVIEW_CONSTS } from "@constants";
import { useStepContext } from "@contexts";
import { Font, Layout as L } from "@design-system";
import { langStore } from "@store";
import { InterviewTypes } from "@types";
import React from "react";
import { useRecoilState } from "recoil";
import GoNextButton from "../../components/GoNextButton/GoNextButton";
import SelectChips from "../../components/SelectChips/SelectChips";

const { FIXED_CONVO, LANG_OPTIONS, LANG_OPTION_LABEL } = INTERVIEW_CONSTS;

const SelectLang = () => {
  const [lang, setLang] = useRecoilState(langStore);
  const { goNext } = useStepContext();

  const canGoNext = !!lang;

  return (
    <L.FlexCol
      w={"100%"}
      flex={1}
      pv={30}
      ph={30}
      alignItems="center"
      justifyContent="center"
    >
      <L.FlexCol alignItems="center" w={"60%"}>
        <Font.Body
          type={"16_medium_multi"}
          color={"PRIMARY_500"}
          mb={20}
          textAlign="center"
        >
          {FIXED_CONVO["SELECT_LANG"]["ENG"]}
        </Font.Body>

        <SelectChips<InterviewTypes.Lang>
          options={LANG_OPTIONS.map((value) => ({
            value,
            text: LANG_OPTION_LABEL[value],
          }))}
          onSelect={setLang}
        />
        <GoNextButton onClick={goNext} canGoNext={canGoNext} />
      </L.FlexCol>
    </L.FlexCol>
  );
};

export default React.memo(SelectLang);
