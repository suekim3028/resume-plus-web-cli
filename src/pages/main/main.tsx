import { Layout as L } from "@design-system";
import TopBar from "src/components/TopBar/TopBar";

const Main = () => {
  return (
    <L.FlexCol w={"100%"} bgColor="primaryContainer" h={100}>
      <TopBar />
    </L.FlexCol>
  );
};

export default Main;
