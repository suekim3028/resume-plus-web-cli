import { ChatMain } from "@components";
import { Layout as L } from "@design-system";
import TopBar from "src/components/TopBar/TopBar";

const Main = () => {
  return (
    <L.FlexCol flex={1} h={"100%"} style={{ height: "100dvh" }}>
      <L.FlexRow w="100%" h={"100%"} bgColor="surface">
        <L.FlexCol h={"100%"} flex={1} w={"100%"}>
          <TopBar />
          <ChatMain />
        </L.FlexCol>
      </L.FlexRow>
    </L.FlexCol>
  );
};

export default Main;
