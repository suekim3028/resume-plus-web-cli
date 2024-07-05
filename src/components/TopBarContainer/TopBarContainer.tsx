import { GridItem } from "@chakra-ui/react";
import { Flex, GridWrapper, Text } from "@uis";
import Link from "next/link";
import React from "react";
import Icon from "../Icon/Icon";
import Logo from "../Logo/Logo";

const TopBarContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="100%" direction={"column"} alignItems={"center"}>
      <GridWrapper h={60}>
        <GridItem colSpan={2} alignItems={"center"} display={"flex"}>
          <Logo />
        </GridItem>
        {Buttons.map(({ name, href }, idx) => (
          <GridItem
            key={name}
            colStart={9 + idx}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Link href={""}>
              <Text type={"Body2_Normal"}>{name}</Text>
            </Link>
          </GridItem>
        ))}
        <GridItem
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Icon name={"navigationMypage_LabelStrong"} size={24} href={"/"} />
        </GridItem>
      </GridWrapper>
      {children}
    </Flex>
  );
};

const Buttons: { name: string; href: string }[] = [
  {
    name: "서비스 안내",
    href: "",
  },
  {
    name: "면접 연습",
    href: "",
  },
  {
    name: "면접 결과",
    href: "",
  },
];

export default TopBarContainer;
