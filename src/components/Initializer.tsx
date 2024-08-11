"use client";

import { companyDataStore } from "@store";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

export default function Initializer({ children }: { children: ReactNode }) {
  useRecoilValue(companyDataStore);

  return children;
}
