import { Grid } from "@chakra-ui/react";
import { Flex, Text } from "@ui";
import React from "react";
import Icon from "../Icon/Icon";
import Logo from "../Logo/Logo";

const TopBarContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="100%" direction={"column"}>
      <Grid h="40px" templateColumns="repeat(12, 1fr)" gap={4}>
        <Flex isGridItem colSpan={2}>
          <Logo />
        </Flex>
        {Buttons.map(({ name, href }, idx) => (
          <Flex
            key={name}
            isGridItem
            colSpan={1}
            colStart={9 + idx}
            h={"40px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text type={"Body2_Normal"}>서비스 안내</Text>
          </Flex>
        ))}
        <Flex isGridItem justifyContent={"flex-end"} alignItems={"center"}>
          <Icon name={"navigationMypage_LabelStrong"} size={24} />
        </Flex>
      </Grid>
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
    name: "서비스 안내",
    href: "",
  },
  {
    name: "서비스 안내",
    href: "",
  },
];

export default TopBarContainer;
