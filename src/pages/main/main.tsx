import { ChatMain } from "@components";
import { Layout as L } from "@design-system";
import TopBar from "src/components/TopBar/TopBar";

const Main = () => {
  return (
    <L.FlexCol
      h={"100%"}
      w={"100%"}
      justifyContent="space-between"
      style={{ border: "3px solid blue" }}
    >
      <TopBar />
      <ChatMain />
    </L.FlexCol>
  );
};

export default Main;
