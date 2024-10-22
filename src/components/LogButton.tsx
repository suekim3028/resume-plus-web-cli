"use client";

import { ReactNode } from "react";
import { EventLogger } from "./EventLogger";

const LogButton = ({
  children,
  log,
}: {
  children: ReactNode;
  log: Parameters<typeof EventLogger.log>;
}) => {
  return <div onClickCapture={() => EventLogger.log(...log)}>{children}</div>;
};

export default LogButton;
