import { Layout as L } from "@design-system";
import TopBar from "src/components/TopBar/TopBar";

const Main = () => {
  return (
    <L.FlexCol flex={1} h={"100%"} style={{ height: "100vh" }}>
      <TopBar />
      <L.FlexRow
        w="100%"
        h={"100%"}
        bgColor="surface"
        outline={"error"}
      ></L.FlexRow>
    </L.FlexCol>
  );
};

export default Main;
