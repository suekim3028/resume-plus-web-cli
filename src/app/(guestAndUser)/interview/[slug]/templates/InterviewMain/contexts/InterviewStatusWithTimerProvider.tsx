import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { interval, Subscription, take } from "rxjs";
import { InterviewMainStatus } from "../types";

const InterviewStatusWithTimerContext =
  createContext<InterviewStatusWithTimerValue | null>(null);

type InterviewStatusWithTimerValue = {
  status: InterviewMainStatus;
  finishInterview: () => void;
  pauseInterview: () => void;
  resumeInterview: () => void;
  addSecondTimerListener: (cb: (remainSeconds: number) => void) => Subscription;
};

const InterviewStatusWithTimerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [status, setStatus] = useState<InterviewMainStatus>("DEFAULT");
  const [$timer] = useState(interval(1000).pipe(take(60 * 60)));
  const statusBeforePaused = useRef<InterviewMainStatus | null>(null);

  const finishInterview = useCallback(() => {
    if (status === "FORCED_END" || status === "END") return;
    setStatus("END");
  }, [status]);

  const pauseInterview = useCallback(() => {
    if (status === "FORCED_END" || status === "END" || status === "PAUSED")
      return;

    setStatus((s) => {
      statusBeforePaused.current = s;
      return "PAUSED";
    });
  }, [status]);

  const resumeInterview = useCallback(() => {
    if (status !== "PAUSED") return;
    setStatus(statusBeforePaused.current || "DEFAULT");
  }, [status]);

  const forceEndInterview = useCallback(() => {
    setStatus("FORCED_END");
  }, []);

  const addSecondTimerListener: InterviewStatusWithTimerValue["addSecondTimerListener"] =
    useCallback(
      (cb) => {
        return $timer.subscribe((v) => cb(60 * 60 - v));
      },
      [$timer]
    );

  const providerValue: InterviewStatusWithTimerValue = useMemo(
    () => ({
      status,
      finishInterview,
      pauseInterview,
      resumeInterview,
      addSecondTimerListener,
    }),
    [
      status,
      finishInterview,
      pauseInterview,
      resumeInterview,
      addSecondTimerListener,
    ]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      forceEndInterview();
    }, 60 * 60 * 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <InterviewStatusWithTimerContext.Provider value={providerValue}>
      {children}
    </InterviewStatusWithTimerContext.Provider>
  );
};

export const InterviewStatusSwitch = ({
  status,
  children,
}: {
  status: InterviewMainStatus;
  children: ReactNode;
}) => {
  const { status: currentStatus } = useInterviewStatusWithTimerContext();
  if (status !== currentStatus) return <></>;
  return children;
};

export const useInterviewStatusWithTimerContext = () => {
  const context = useContext(InterviewStatusWithTimerContext);

  if (!context)
    throw new Error(
      "[InterviewStatusWithTimerContext] UseInterviewStatusWithTimer must be used in provider."
    );
  return context;
};

export default InterviewStatusWithTimerProvider;
