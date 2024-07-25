"use client";
import { GridItem } from "@chakra-ui/react";
import { userStore } from "@store";
import { Flex, GridWrapper, Text } from "@uis";
import Link from "next/link";
import {
  ForwardRefRenderFunction,
  ReactNode,
  Suspense,
  forwardRef,
} from "react";
import { useRecoilValue } from "recoil";
import Icon from "../Icon/Icon";
import Logo from "../Logo/Logo";

const TopBarContainerComponent: ForwardRefRenderFunction<
  HTMLDivElement,
  { children: ReactNode }
> = ({ children }, ref) => {
  return (
    <Flex w="100%" direction={"column"} alignItems={"center"} ref={ref}>
      <GridWrapper h={60}>
        <GridItem colSpan={2} alignItems={"center"} display={"flex"}>
          <Logo />
        </GridItem>

        <Suspense fallback={<></>}>
          <UserButtonList />
        </Suspense>
      </GridWrapper>
      {children}
    </Flex>
  );
};

const TopBarContainer = forwardRef<HTMLDivElement, { children: ReactNode }>(
  TopBarContainerComponent
);

const UserButtonList = () => {
  const user = useRecoilValue(userStore);

  return (
    <>
      <Button name={"서비스 안내"} href={"/"} colStart={9} />
      <Button
        name={"면접 연습"}
        href={user ? "/interview" : "/sign-in"}
        colStart={10}
      />
      <Button
        name={"면접 결과"}
        href={user ? "/interview" : "/sign-in"}
        colStart={11}
      />

      {user ? (
        <GridItem
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          colStart={12}
        >
          <Icon name={"navigationMypage_LabelStrong"} size={24} href={"/"} />
        </GridItem>
      ) : (
        <Button
          name={"로그인"}
          href={user ? "/interview" : "/sign-in"}
          colStart={12}
        />
      )}
    </>
  );
};

const Button = ({
  name,
  href,
  colStart,
}: {
  name: string;
  href: string;
  colStart: number;
}) => {
  return (
    <>
      <GridItem
        key={name}
        colStart={colStart}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Link href={href} style={{ textDecoration: "none", color: "black" }}>
          <Text type={"Body2_Normal"}>{name}</Text>
        </Link>
      </GridItem>
    </>
  );
};

export default TopBarContainer;
