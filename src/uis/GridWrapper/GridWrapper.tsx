import { Grid } from "@chakra-ui/react";
import { ReactNode } from "react";

const GridWrapper = ({ children, h }: { children: ReactNode; h?: number }) => {
  return (
    <Grid templateColumns={"repeat(12, 1fr)"} w="1200px" gap={24} h={h}>
      {children}
    </Grid>
  );
};

export default GridWrapper;
