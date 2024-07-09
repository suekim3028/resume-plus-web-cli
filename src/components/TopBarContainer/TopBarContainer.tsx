"use client";
import { GridItem } from "@chakra-ui/react";
import { userStore } from "@store";
import { Flex, GridWrapper, Text } from "@uis";
import Link from "next/link";
import React, { Suspense } from "react";
import { useRecoilValue } from "recoil";
import Icon from "../Icon/Icon";
import Logo from "../Logo/Logo";

const TopBarContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="100%" direction={"column"} alignItems={"center"}>
      <GridWrapper h={60}>
        <GridItem colSpan={2} alignItems={"center"} display={"flex"}>
          <Logo />
        </GridItem>
        <Button name={"서비스 안내"} href={""} idx={0} />
        <Suspense fallback={<></>}>
          <UserButtonList />
        </Suspense>
        <GridItem
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          colStart={12}
        >
          <Icon name={"navigationMypage_LabelStrong"} size={24} href={"/"} />
        </GridItem>
      </GridWrapper>
      {children}
    </Flex>
  );
};

const UserButtonList = () => {
  const user = useRecoilValue(userStore);

  return (
    <>
      <Button
        name={"면접 연습"}
        href={user ? "/interview" : "/sign-in"}
        idx={1}
      />
      <Button
        name={"면접 결과"}
        href={user ? "/interview" : "/sign-in"}
        idx={2}
      />
    </>
  );
};

const Button = ({
  name,
  href,
  idx,
}: {
  name: string;
  href: string;
  idx: number;
}) => {
  return (
    <GridItem
      key={name}
      colStart={9 + idx}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Link href={href}>
        <Text type={"Body2_Normal"}>{name}</Text>
      </Link>
    </GridItem>
  );
};

export default TopBarContainer;
