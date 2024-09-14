"use client";
import { useLoadableUser } from "@atoms";
import * as animationData from "@public/lotties/loading.json";
import { UserTypes } from "@types";
import { Flex } from "@uis";
import React, { ReactNode, useMemo, useRef } from "react";
import Lottie from "react-lottie";

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

  const currentLoginType = useRef(
    value.state === "hasData" ? value.data?.loginType || null : null
  );

  const isValid = useMemo(() => {
    if (typeof window === "undefined") return true; // static page generation issue. 서버 컴포넌트 생성 시 overlay가 있는 상태에서 생성되면, 클라이언트에서 isValid값이 true가 초기값인 경우 서버 생성 그대로 보여주기 때문에 오버레이 안없어짐
    if (value.state !== "hasData") return false;
    const _isValid = validate(value.data);

    if (
      (currentLoginType.current !== value.data?.loginType || null) &&
      !_isValid
    ) {
      currentLoginType.current = value.data?.loginType || null;
      onInvalidState();
    }

    return _isValid;
  }, [value.state === "hasData" ? value.data?.loginType : undefined]);

  return (
    <>
      {children}
      <Flex
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
