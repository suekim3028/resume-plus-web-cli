import { Font, Icons, Layout as L } from "@design-system";
import { useTheme } from "styled-components";

const TopBar = () => {
  return (
    <L.FlexRow w="100%" style={{ alignSelf: "flex-start" }}>
      <L.FlexRow
        alignItems={"center"}
        w={"100%"}
        ph={40}
        pv={20}
        bgColor={"PRIMARY_400"}
      >
        <Font.Title type={"24_semibold_single"} color={"BASIC_WHITE"} ml={10}>
          Resume+
        </Font.Title>
      </L.FlexRow>
    </L.FlexRow>
  );
};

export default TopBar;
