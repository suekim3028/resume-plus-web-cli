import { ChatMain } from "@components";
import { Layout as L } from "@design-system";
import { useContext, useEffect } from "react";
import TopBar from "src/components/TopBar/TopBar";
import { UserContext } from "../../pages/_app.page";
import { useRouter } from "next/router";

const Main = () => {
  const context = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!context?.hasUser) router.replace("/");
  }, [context?.hasUser]);

  if (!context || !context.hasUser) return <></>;

  return (
    <L.FlexCol h={"100%"} w={"100%"} justifyContent="space-between">
      <TopBar />
      <ChatMain />
    </L.FlexCol>
  );
};

export default Main;
