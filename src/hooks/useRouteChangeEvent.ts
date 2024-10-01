// src/app/route-change-listener.tsx

"use client";

import { EventLogger } from "@components";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export const useRouteChangeEvent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const prev = useRef(pathname);

  useEffect(() => {
    if (prev.current === pathname) return;

    prev.current = pathname;

    switch (pathname) {
      case "/": {
        const utm_campaign = searchParams.get("utm_campaign");
        const utm_medium = searchParams.get("utm_medium");
        const utm_source = searchParams.get("utm_source");

        EventLogger.log("Home", { utm_campaign, utm_medium, utm_source });
        return;
      }
      case "/sign-in":
        EventLogger.log("LogIn");
        return;
      case "/sign-up":
        EventLogger.log("SignUp");
        return;

      case "/interview-setting":
        EventLogger.log("InterviewSetting");
        return;

      case "/profile":
        EventLogger.log("Profile");
        return;
      case "/sign-in":
        EventLogger.log("LogIn");
        return;
      case "/result":
        EventLogger.log("InterviewResult");
        return;

      case "/sign-in/email":
        EventLogger.log("IdLogIn");
        return;
    }
  }, [pathname]);
};
