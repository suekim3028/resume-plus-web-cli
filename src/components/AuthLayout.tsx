"use client";
import { useLoadableUser } from "@atoms";
import { UserTypes } from "@types";
import { Flex } from "@uis";

import React, { ReactNode, useEffect, useMemo, useRef } from "react";

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
    if (typeof window === "undefined") return false; // static page generation issue
    if (value.state !== "hasData") return false;
    console.log(value.data?.loginType);
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

  useEffect(() => {
    if (typeof window === "undefined" || isValid) {
      document.getElementsByClassName("noe").item(0)?.remove(); //reload 시 제대로 동작안하고 계속 overlay 남아 있는 문제. 직접 지워주는 거로 해결
    }
  }, []);

  return (
    <>
      {children}
      {!isValid && (
        <Flex
          className="noe"
          position={"fixed"}
          left={0}
          right={0}
          top={0}
          bottom={0}
          bgRgbColor={"rgba(0,0,0,0.2)"}
        >
          hi
        </Flex>
      )}
    </>
  );
};

const Test = () => {
  console.log("!!");
  return <></>;
};

export default React.memo(AuthLayout);
// export default function Auth({ children }: { children: ReactNode }) {
//   return children;
// }
