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
  setLanguage: (lang: InterviewTypes.Lang | null) => void;
  isLoadingNext: boolean;
  isAfterStep: (isAfter: InterviewTypes.Step) => boolean;
  setPosition: (position: InterviewTypes.Position | null) => void;
  setLocalPdfFile: (file: File | null) => void;
  canGoNext: boolean;
};

const ChatMainContext = createContext<ChatMainContextValue | null>(null);

const ChatMainContextProvider = ({ children }: PropsWithChildren) => {
  const [stepIdx, setStepIdx] = useState(0);
  const step = STEPS[stepIdx];
  const [lang, setLang] = useState<InterviewTypes.Lang | null>(null);
  const [position, setPosition] = useState<InterviewTypes.Position | null>(
    null
  );
  const [localPdfFile, setLocalPdfFile] = useState<File | null>(null);
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  const canGoNext = (() => {
    switch (step) {
      case "INTRO":
        return !!lang;
      case "UPLOAD_CV":
        return !!position && !!localPdfFile;

      default:
        return true;
    }
  })();

  const goNext = useCallback(() => {
    if (stepIdx === STEPS.length - 1) return;

    switch (step) {
      case "INTRO":
        break;

      default:
        break;
    }
    setStepIdx((i) => i + 1);
  }, [step]);

  const isAfterStep = (isAfter: InterviewTypes.Step) =>
    stepIdx >= STEPS.findIndex((s) => s === isAfter);

  const value: ChatMainContextValue = {
    step,
    goNext,
    setPosition,
    setLanguage: setLang,
    isLoadingNext,
    setLocalPdfFile,
    canGoNext,
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
