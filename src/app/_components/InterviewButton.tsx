"use client";

import { useUser } from "@hooks";
import { Suspense } from "react";

const InterviewButtonComponent = () => {
  const { user } = useUser();
  return <></>;
};

const InterviewButton = () => {
  <Suspense fallback={<>???</>}>
    <InterviewButtonComponent />
  </Suspense>;
};
export default InterviewButton;
