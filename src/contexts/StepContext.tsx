import { INTERVIEW_CONSTS } from "@constants";
import { InterviewTypes } from "@types";
import { createContext, useContext, useState } from "react";
const { STEPS } = INTERVIEW_CONSTS;

type StepContextValue = {
  step: InterviewTypes.Step;
  goNext: () => void;
};

const StepContext = createContext<StepContextValue | null>(null);

const StepContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [stepIdx, setStepIdx] = useState(0);
  const step = STEPS[stepIdx];

  const goNext = () => setStepIdx((p) => (p === STEPS.length - 1 ? p : p + 1));

  const value: StepContextValue = {
    step,
    goNext,
  };

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
};

export const useStepContext = () => {
  const value = useContext(StepContext);

  if (!value)
    throw new Error("useStepContext must be used within StepContextProvider");

  return value;
};

export default StepContextProvider;
