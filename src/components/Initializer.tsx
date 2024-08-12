"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { ReactNode, useEffect } from "react";

export default function Initializer({ children }: { children: ReactNode }) {
  useInitialize();

  return children;
}

const useInitialize = () => {
  // const state = useRecoilValue(companyDataStore);
  useEffect(() => {
    amplitude.init("fe5ab1aed382a9da2fb86c24325c6816");
  }, []);
};
