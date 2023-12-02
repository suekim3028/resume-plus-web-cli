import { interviewApis } from "@apis";
import { INTERVIEW_CONSTS } from "@constants";
import { InterviewTypes } from "@types";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
const { STEPS } = INTERVIEW_CONSTS;
import { pdfjs } from "react-pdf";

type ChatMainContextValue = {
  step: InterviewTypes.Step;
  goNext: () => void;
  setLanguage: (lang: InterviewTypes.Lang | null) => void;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(false);

  const cvTextRef = useRef("");

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

  const goNext = () => {
    if (stepIdx === STEPS.length - 1) return;

    switch (step) {
      case "INTRO":
        break;
      case "UPLOAD_CV": {
        if (!localPdfFile || !position) break;
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

        setIsLoading(true);
        (async () => {
          const document = await pdfjs.getDocument(
            await localPdfFile.arrayBuffer()
          ).promise;

          for (let index of Array.from(
            { length: document.numPages },
            (_, i) => i
          )) {
            const page = await document.getPage(index + 1);
            const pageContent = await page.getTextContent();
            pageContent.items.map((item) => {
              if ("str" in item) {
                cvTextRef.current = [cvTextRef.current, item.str].join(" ");
              }
            });
          }
          await interviewApis.uploadCV({
            content: cvTextRef.current,
            position,
          });
          setIsLoading(false);
        })();
      }

      default:
        break;
    }
    setStepIdx((i) => i + 1);
  };

  const isAfterStep = (isAfter: InterviewTypes.Step) =>
    stepIdx >= STEPS.findIndex((s) => s === isAfter);

  const value: ChatMainContextValue = {
    step,
    goNext,
    setPosition,
    setLanguage: setLang,
    isLoading,
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
