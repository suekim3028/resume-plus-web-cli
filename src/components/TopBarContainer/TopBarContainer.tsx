"use client";
import { GridItem } from "@chakra-ui/react";
import { EventLogger } from "@components/EventLogger";
import Footer from "@components/Footer";

import { Flex, GridWrapper } from "@uis";
import { useRouter } from "next/navigation";
import { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";
import Logo from "../Logo/Logo";
import TopBarButton from "./components/TopBarButton";
import UserButton from "./components/UserButton";

const TopBarContainerComponent: ForwardRefRenderFunction<
  HTMLDivElement,
  { children: ReactNode; footer?: boolean }
> = ({ children, footer }, ref) => {
  const router = useRouter();
  return (
    <Flex
      w="100%"
      position={"absolute"}
      left={0}
      right={0}
      top={0}
      bottom={0}
      direction={"column"}
      alignItems={"center"}
      ref={ref}
      bgColor={"Static/White"}
    >
      <Flex
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        borderBottom={"1px solid rgba(225, 226, 228, 1)"}
      >
        <GridWrapper h={60}>
          <GridItem
            colSpan={2}
            alignItems={"center"}
            display={"flex"}
            onClick={() => {
              router.push("/");
              EventLogger.log("global_navigation_bar_button", "logo");
            }}
            cursor={"pointer"}
          >
            <Logo size={"SMALL"} />
          </GridItem>

          <TopBarButton
            name={"서비스 안내"}
            href={
              "https://alive-capacity-239.notion.site/cc48f3bb32d74e24b7f7c17df2230813?pvs=4"
            }
            colStart={9}
          />
          <TopBarButton
            name={"면접 연습"}
            href={"/interview-setting"}
            colStart={10}
          />
          <TopBarButton name={"면접 결과"} href={"/result"} colStart={11} />

          <UserButton />
        </GridWrapper>
      </Flex>
      <Flex
        flex={1}
        overflowY={"scroll"}
        w="100%"
        flexDir={"column"}
        justifyContent={"space-between"}
      >
        <Flex w="100%" flexDir={"column"}>
          {children}
        </Flex>
        {footer && <Footer />}
      </Flex>
    </Flex>
  );
};

const TopBarContainer = forwardRef<
  HTMLDivElement,
  { children: ReactNode; footer?: boolean }
>(TopBarContainerComponent);

export default TopBarContainer;
