import { INTERVIEW_CONSTS } from "@constants";
import { InterviewTypes } from "@types";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
const { STEPS } = INTERVIEW_CONSTS;

type ChatMainContextValue = {
  step: InterviewTypes.Step;
  goNext: () => void;
  setLanguage: (lang: InterviewTypes.Lang) => void;
  isLoadingNext: boolean;
  isAfterStep: (isAfter: InterviewTypes.Step) => boolean;
};

const ChatMainContext = createContext<ChatMainContextValue | null>(null);

const ChatMainContextProvider = ({ children }: PropsWithChildren) => {
  const [step, setStep] = useState(STEPS[0]);
  const [lang, setLang] = useState<InterviewTypes.Lang>("ENG");
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const stepIdx = STEPS.findIndex((s) => s === step);

  const goNext = useCallback(() => {
    if (stepIdx === STEPS.length - 1) return;
  }, [stepIdx]);

  const isAfterStep = (isAfter: InterviewTypes.Step) =>
    stepIdx >= STEPS.findIndex((s) => s === isAfter);

  const value: ChatMainContextValue = {
    step,
    goNext,
    setLanguage: setLang,
    isLoadingNext,
    isAfterStep,
  };

  return (
    <ChatMainContext.Provider value={value}>
      {children}
    </ChatMainContext.Provider>
  );
};

export const useChatMainContext = () => {
  const value = useContext(ChatMainContext);

  if (!value)
    throw new Error(
      "useChatMainContext must be used within ChatMainContextProvider"
    );

  return value;
};

export default ChatMainContextProvider;
