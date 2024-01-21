import { INTERVIEW_CONSTS } from "@constants";
import { InterviewTypes } from "@types";
import {
  PropsWithChildren,
  RefObject,
  createContext,
  useContext,
  useState,
} from "react";
const { STEPS } = INTERVIEW_CONSTS;

type StepContextValue = {
  step: InterviewTypes.Step;
  goNext: () => void;
  cameraReady: boolean;
  onCameraReady: () => void;
};

const StepContext = createContext<StepContextValue | null>(null);

const StepContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);
  const step = STEPS[stepIdx];

  const goNext = () => setStepIdx((p) => (p === STEPS.length - 1 ? p : p + 1));
  const onCameraReady = () => setCameraReady(true);
  const value: StepContextValue = {
    step,
    goNext,
    cameraReady,
    onCameraReady,
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
