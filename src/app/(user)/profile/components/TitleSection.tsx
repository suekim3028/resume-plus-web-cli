import { GridItem } from "@chakra-ui/react";
import { GridWrapper, Text } from "@uis";

const TitleSection = () => (
  <GridWrapper w="100%" pb={48}>
    <GridItem colStart={5} colSpan={2}>
      <Text type={"Title1"} fontWeight={"700"}>
        프로필
      </Text>
    </GridItem>
  </GridWrapper>
);

export default TitleSection;
