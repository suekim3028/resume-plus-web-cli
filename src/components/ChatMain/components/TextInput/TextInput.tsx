import { Layout as L } from "@design-system";
import * as S from "./TextInput.styles";

const TextInput = () => {
  return (
    <L.FlexRow w={"100%"} pv={20} ph={20}>
      <S.Input />
    </L.FlexRow>
  );
};

export default TextInput;
