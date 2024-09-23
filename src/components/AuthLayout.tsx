"use client";
import { useUserValue } from "@atoms";
import { UserTypes } from "@types";
import { Flex } from "@uis";
import React, { ReactNode, useEffect, useMemo } from "react";
import Spinner from "./Spinner";

const AuthLayout = ({
  children,
  onInvalidState,
  validate,
}: {
  children: ReactNode;
  onInvalidState: () => void;
  validate: (loginType: UserTypes.LoginType | null) => boolean;
}) => {
  const { user } = useUserValue();

  const isValid = useMemo(() => {
    return validate(user?.loginType || null);
  }, [user?.loginType]);

  useEffect(() => {
    if (!isValid) {
      onInvalidState();
    }
  }, [isValid]);

  return (
    <>
      {children}
      <Flex
        id="auth_layout_overlay"
        position={"fixed"}
        left={0}
        display={isValid ? "none" : "flex"}
        right={0}
        top={0}
        bottom={0}
        bgRgbColor={"rgba(0,0,0,0.2)"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Spinner size={30} />
      </Flex>
    </>
  );
};

export default React.memo(AuthLayout);
