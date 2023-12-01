import { Font, Icons, Layout as L } from "@design-system";
import { useTheme } from "styled-components";

const TopBar = () => {
  const theme = useTheme();
  return (
    <L.FlexRow
      w={"100%"}
      ph={40}
      pv={20}
      bgColor={"primary"}
      alignItems={"center"}
    >
      <Icons.FiMenu size={"30px"} color={theme["onPrimary"]} />

      <Font.Title type={"24_semibold_single"} color={"onPrimary"} ml={10}>
        AI Project
      </Font.Title>
    </L.FlexRow>
  );
};

export default TopBar;
