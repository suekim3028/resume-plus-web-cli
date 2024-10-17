"use client";

import { GridItem } from "@chakra-ui/react";
import Icon from "@components/Icon/Icon";

import { queryOptions } from "@queries";
import { useQuery } from "@tanstack/react-query";
import { Flex } from "@uis";
import TopBarButton from "./TopBarButton";
import UserHoverMenuWrapper from "./UserHoverMenuWrapper/UserHoverMenuWrapper";

const UserButton = () => {
  const { data: user } = useQuery(queryOptions.userQueryOptions);

  if (!user || user.isGuest)
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

export default UserButton;
