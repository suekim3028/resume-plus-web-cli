import { GridItem } from "@chakra-ui/react";
import { UI } from "@constants";
import { Flex, GridWrapper } from "@uis";
import { ReactNode } from "react";

const Container = ({
  children,
  colSpan,
  colStart,
  bgColor,
}: {
  children: ReactNode;
  colSpan: number;
  colStart: number;
  bgColor?: UI.ColorKeys;
}) => {
  return (
    <Flex bgColor={bgColor || "Static/White"} w="100dvw" h="100dvh">
      <GridWrapper h="100dvh">
        <GridItem
          py={200}
          colSpan={colSpan}
          colStart={colStart}
          display={"flex"}
          h="100dvh"
          flex={1}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {children}
        </GridItem>
      </GridWrapper>
    </Flex>
  );
};
export default Container;
