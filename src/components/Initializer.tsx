"use client";
import * as amplitude from "@amplitude/analytics-browser";
import { useRouteChangeEvent } from "@hooks";
import { ReactNode, useEffect, useRef } from "react";

export default function Initializer({ children }: { children: ReactNode }) {
  const effected = useRef(false);
  useRouteChangeEvent();

  useEffect(() => {
    if (effected.current) return;

    effected.current = true;
    amplitude.init("fe5ab1aed382a9da2fb86c24325c6816", {
      autocapture: false,
    });
  }, []);

  return children;
}
