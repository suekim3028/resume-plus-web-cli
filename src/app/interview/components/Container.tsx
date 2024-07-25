import { GridItem } from "@chakra-ui/react";
import { UI } from "@constants";
import { Flex, GridWrapper } from "@uis";
import { ReactNode } from "react";

const Container = ({
  children,
  colSpan,
  colStart,
  bgColor,
  bgRgbColor,
  py,
}: {
  children: ReactNode;
  colSpan: number;
  colStart: number;
  bgColor?: UI.ColorKeys;
  bgRgbColor?: string;
  py?: number;
}) => {
  return (
    <Flex
      bgRgbColor={bgRgbColor || UI.COLORS[bgColor || "Static/White"]}
      w="100dvw"
      h="100dvh"
      // alignItems={"center"}
      justifyContent={"center"}
    >
      <GridWrapper h="100dvh">
        <GridItem
          py={py ?? 200}
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
