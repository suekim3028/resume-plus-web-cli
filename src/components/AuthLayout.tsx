"use client";
import { useLoadableUser } from "@atoms";
import { UserTypes } from "@types";
import { Flex } from "@uis";

import { ReactNode, useEffect, useRef } from "react";

const AuthLayout = ({
  children,
  onInvalidState,
  validate,
}: {
  children: ReactNode;
  onInvalidState: () => void;
  validate: (user: UserTypes.User | null) => boolean;
}) => {
  const value = useLoadableUser();

  const isValid = value.state === "hasData" && validate(value.data);

  const effected = useRef(false);
  useEffect(() => {
    if (value.state !== "hasData" || effected.current) return;
    effected.current = true;
    if (!isValid) {
      onInvalidState();
    }
  }, [value.state === "hasData", isValid]);

  if (isValid) {
    return children;
  }

  return (
    <Flex
      position={"fixed"}
      left={0}
      right={0}
      top={0}
      bottom={0}
      bgRgbColor={"rgba(0,0,0,0.5)"}
      zIndex={10}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {children}
    </Flex>
  );
};

export default AuthLayout;
