"use client";
import * as amplitude from "@amplitude/analytics-browser";
import { useRefreshUser } from "@atoms";
import { useRouteChangeEvent } from "@hooks";
import { ReactNode, useEffect, useRef, useState } from "react";

export default function Initializer({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const refreshUser = useRefreshUser();

  const effected = useRef(false);

  useRouteChangeEvent();
  useEffect(() => {
    if (effected.current) return;

    effected.current = true;
    amplitude.init("fe5ab1aed382a9da2fb86c24325c6816", {
      autocapture: false,
    });

    (async () => {
      await refreshUser();
      setIsInitialized(true);
    })();
  }, []);

  return isInitialized ? children : <></>;
}
