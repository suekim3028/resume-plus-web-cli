import { Grid, GridProps } from "@chakra-ui/react";
import { ReactNode } from "react";

const GridWrapper = ({
  children,
  ...gridProps
}: {
  children: ReactNode;
} & GridProps) => {
  return (
    <Grid
      templateColumns={"repeat(12, 1fr)"}
      w="1200px"
      gap={24}
      {...gridProps}
    >
      {children}
    </Grid>
  );
};

export default GridWrapper;
