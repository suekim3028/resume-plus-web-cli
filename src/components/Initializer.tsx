"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { companyDataStore } from "@store";
import { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function Initializer({ children }: { children: ReactNode }) {
  useRecoilValue(companyDataStore);
  useEffect(() => {
    amplitude.init("fe5ab1aed382a9da2fb86c24325c6816");
  }, []);

  return children;
}
