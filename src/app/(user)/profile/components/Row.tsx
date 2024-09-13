import { GridItem } from "@chakra-ui/react";
import { GridWrapper, Text } from "@uis";

const Row = ({ title, body }: { title: string; body: string }) => {
  return (
    <GridWrapper w="100%" pb={24}>
      <GridItem colStart={5} colSpan={2}>
        <Text type={"Title2"} color={"Primary/Normal"} fontWeight={"700"}>
          {title}
        </Text>
      </GridItem>
      <GridItem colStart={7} colSpan={5}>
        <Text type={"Title2"} color={"Label/Alternative"} fontWeight={"500"}>
          {body}
        </Text>
      </GridItem>
    </GridWrapper>
  );
};

export default Row;
