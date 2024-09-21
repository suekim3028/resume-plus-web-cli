// src/app/route-change-listener.tsx

"use client";

import { EventLogger } from "@components";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const useRouteChangeEvent = () => {
  const pathname = usePathname();
  const prev = useRef(pathname);

  useEffect(() => {
    if (prev.current === pathname) return;

    prev.current = pathname;
    switch (pathname) {
      case "/":
        EventLogger.log("Home");
        break;
      case "/sign-in":
        EventLogger.log("LogIn");
        break;
      case "/sign-up":
        EventLogger.log("SignUp");
        break;

      case "/interview-setting":
        EventLogger.log("InterviewSetting");
        break;

      case "/profile":
        EventLogger.log("Profile");
        break;
      case "/sign-in":
        EventLogger.log("LogIn");
        break;
      case "/result":
        EventLogger.log("InterviewResult");
        break;

      default:
        if (pathname.startsWith("/interview/")) {
          EventLogger.log("Interview");
        }
        break;
    }
    if (pathname === "/") {
    } else if (pathname === "/sign-in") {
      EventLogger.log("LogIn");
    } else if (pathname === "/sign-in/email") {
      EventLogger.log("IdLogIn");
    } else if (pathname === "/sign-up") {
    }
  }, [pathname]);
};
