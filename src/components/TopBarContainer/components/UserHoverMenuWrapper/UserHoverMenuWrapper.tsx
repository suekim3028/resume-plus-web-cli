"use client";

import { GridItem } from "@chakra-ui/react";
import { EventLogger } from "@components/EventLogger";
import { useAuth } from "@hooks";
import { queryOptions } from "@queries";
import { useQuery } from "@tanstack/react-query";
import { Flex, Text } from "@uis";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import TopBarButton from "../TopBarButton";

const UserHoverMenuWrapper = ({ children }: { children: ReactNode }) => {
  const { data: user } = useQuery(queryOptions.userQueryOptions);
  const router = useRouter();
  const { signOut } = useAuth();
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  if (!user || user.isGuest)
    return <TopBarButton name={"로그인"} href={"/sign-in"} colStart={12} />;

  return (
    <GridItem
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-end"}
      colStart={12}
      onMouseEnter={() => setUserMenuVisible(true)}
      onMouseLeave={() => setUserMenuVisible(false)}
    >
      <Flex position={"relative"}>
        {children}

        {userMenuVisible && (
          <Flex
            flexDirection={"column"}
            borderRadius={8}
            border={"1px solid black"}
            position={"absolute"}
            top={"100%"}
            right={0}
            bgColor={"Static/White"}
            overflow={"visible"}
            whiteSpace={"nowrap"}
            width={78}
            boxShadow={"0px 2px 8px rgba(0, 0, 0, 0.16)"}
          >
            <Flex
              py={10}
              w="100%"
              justifyContent={"center"}
              cursor={"pointer"}
              onClick={() => {
                router.push("/profile");
                EventLogger.log("global_navigation_bar_profile", "프로필");
              }}
            >
              <Text type="Label1_Normal" fontWeight={"500"}>
                프로필
              </Text>
            </Flex>
            <Flex h={1} w={"100%"} bgColor={"Line/Normal/Strong"} />
            <Flex
              py={10}
              cursor={"pointer"}
              justifyContent={"center"}
              w="100%"
              onClick={() => {
                signOut();
                EventLogger.log("global_navigation_bar_profile", "로그아웃");
              }}
            >
              <Text type="Label1_Normal" fontWeight={"500"}>
                로그아웃
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>
    </GridItem>
  );
};

export default UserHoverMenuWrapper;
