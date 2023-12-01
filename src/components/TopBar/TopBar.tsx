import { Font, Layout as L } from "@design-system";
const TopBar = () => {
  return (
    <L.FlexRow w={"100%"} ph={40} pv={20} bgColor={"primary"} ai={"center"}>
      <Font type="24_semiBold_single" color={"onPrimary"}>
        AI Project
      </Font>
    </L.FlexRow>
  );
};

export default TopBar;
