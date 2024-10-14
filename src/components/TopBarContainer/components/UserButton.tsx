import { tokenLogin } from "@actions/auth";
import { GridItem } from "@chakra-ui/react";
import Icon from "@components/Icon/Icon";
import { Flex } from "@uis";
import { Suspense } from "react";
import TopBarButton from "./TopBarButton";
import UserHoverMenuWrapper from "./UserHoverMenuWrapper/UserHoverMenuWrapper";

const _UserButton = async () => {
  const user = await tokenLogin();

  if (!user || user.isGuestUser)
    return <TopBarButton name={"로그인"} href={"/sign-in"} colStart={12} />;

  return (
    <UserHoverMenuWrapper>
      <GridItem
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        colStart={12}
      >
        <Flex position={"relative"}>
          <Icon name={"navigationMypage_LabelStrong"} size={24} />
        </Flex>
      </GridItem>
    </UserHoverMenuWrapper>
  );
};

export default function UserButton() {
  return (
    <Flex alignItems={"center"} justifyContent={"center"} flex={1}>
      <Suspense
        fallback={
          <TopBarButton name={"로그인"} href={"/sign-in"} colStart={12} />
        }
      >
        <_UserButton />
      </Suspense>
    </Flex>
  );
}
