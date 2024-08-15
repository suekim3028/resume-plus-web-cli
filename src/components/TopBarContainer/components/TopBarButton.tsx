"use client";
import { GridItem } from "@chakra-ui/react";
import { EventLogger } from "@components/EventLogger";

import { Text } from "@uis";
import Link from "next/link";

const TopBarButton = ({
  name,
  href,
  colStart,
}: {
  name: "서비스 안내" | "면접 연습" | "면접 결과" | "로그인";
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
        <Link
          href={href}
          style={{ textDecoration: "none", color: "black" }}
          onClick={() => {
            EventLogger.log("global_navigation_bar_button")(name);
          }}
        >
          <Text type={"Body2_Normal"}>{name}</Text>
        </Link>
      </GridItem>
    </>
  );
};

export default TopBarButton;