"use client";
import { useLoadableUser } from "@atoms";
import * as animationData from "@public/lotties/loading.json";
import { UserTypes } from "@types";
import { Flex } from "@uis";
import React, { ReactNode, useEffect, useRef } from "react";
import Lottie from "react-lottie";

const AuthLayout = ({
  children,
  onInvalidState,
  validate,
}: {
  children: ReactNode;
  onInvalidState: () => void;
  validate: (loginType: UserTypes.LoginType | null) => boolean;
}) => {
  const value = useLoadableUser();

  const currentLoginType =
    value.state === "hasData" ? value.data?.loginType || null : null;
  const prevLoginType = useRef(currentLoginType);
  const isValid = validate(currentLoginType);

  useEffect(() => {
    if (
      value.state === "hasData" &&
      !isValid &&
      prevLoginType.current !== currentLoginType
    ) {
      onInvalidState();
    }
    prevLoginType.current = currentLoginType;
  }, [isValid]);

  useEffect(() => {
    if (typeof window !== "undefined" && isValid) {
      // 이미 isValid인 상태일 때, 서버에서 온 html을 업데이트 하지 않아서 오버레이가 사라지지 않는 문제
      const overlay = document.getElementById("auth_layout_overlay");
      if (overlay) overlay.style["display"] = "none";
    }
  }, []);

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
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={30}
          width={30}
        />
      </Flex>
    </>
  );
};

export default React.memo(AuthLayout);
