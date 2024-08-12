import { Portal } from "@chakra-ui/react";
import { Flex } from "@uis";
import { ReactNode } from "react";

const PopUp = ({
  children,
  visible,
}: {
  children: ReactNode;
  visible: boolean;
}) => {
  if (!visible) return <></>;
  return (
    <Portal>
      <Flex
        bgRgbColor={"rgba(152, 155, 162, 0.8)"}
        alignItems={"center"}
        justifyContent={"center"}
        position={"fixed"}
        left={0}
        right={0}
        bottom={0}
        top={0}
      >
        {children}
      </Flex>
    </Portal>
  );
};

export default PopUp;
