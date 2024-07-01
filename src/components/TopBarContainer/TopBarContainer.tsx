import React from "react";
import Flex from "../Flex/Flex";

const TopBarContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="100%" h="100%" direction={"column"}>
      {children}
    </Flex>
  );
};

export default TopBarContainer;
