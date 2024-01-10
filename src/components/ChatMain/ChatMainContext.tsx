import { interviewApis } from "@apis";
import { INTERVIEW_CONSTS } from "@constants";
import { InterviewTypes } from "@types";
import {
  PropsWithChildren,
  RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { pdfjs } from "react-pdf";
import CommonQ from "./components/Steps/Questions/Questions";
import { withErrorHandling } from "@utils";
const { STEPS } = INTERVIEW_CONSTS;

type ChatMainContextValue = {
  step: InterviewTypes.Step;
  goNext: () => void;
  setLanguage: (lang: InterviewTypes.Lang | null) => void;
  isLoading: boolean;
  isAfterStep: (isAfter: InterviewTypes.Step) => boolean;
  setPosition: (position: InterviewTypes.Position | null) => void;
  setLocalPdfFile: (file: File | null) => void;
  canGoNext: boolean;
  answer: (text: string) => void;
  questionBubbles: { isMine: boolean; text: string }[];
  getFeedback: () => InterviewTypes.Feedback[];
  scrollToBottom: () => void;
};

const ChatMainContext = createContext<ChatMainContextValue | null>(null);

const ChatMainContextProvider = ({
  children,
  scrollRef,
}: PropsWithChildren<{ scrollRef: RefObject<HTMLDivElement> }>) => {
  const [stepIdx, setStepIdx] = useState(0);
  const step = STEPS[stepIdx];
  const [lang, setLang] = useState<InterviewTypes.Lang | null>(null);
  const [position, setPosition] = useState<InterviewTypes.Position | null>(
    null
  );
  const [localPdfFile, setLocalPdfFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const questions = useRef<InterviewTypes.Question[]>([]);
  const currentQIdx = useRef(-1);

  const unevaluatedQs = useRef<number[]>([]);
  const feedbackObj = useRef<Record<number, InterviewTypes.Feedback>>({});

  const feedbackResolver = useRef<null | ((value: null) => void)>(null);

  const [questionBubbles, setQuestionsBubbles] = useState<
    { isMine: boolean; text: string }[]
  >([]);

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

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 200);
  };

  const askNextQ = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 300);
    });

    currentQIdx.current++;
    setQuestionsBubbles((prev) => [
      ...prev,
      { isMine: false, text: questions.current[currentQIdx.current].question },
    ]);

    scrollToBottom();
  };

  const addQuestions = (newQ: InterviewTypes.Question[]) => {
    questions.current = [...questions.current, ...newQ];
    unevaluatedQs.current = [
      ...unevaluatedQs.current,
      ...newQ.map(({ id }) => id),
    ];
  };

  const checkEvaluatedQ = (questionId: number) => {
    unevaluatedQs.current = unevaluatedQs.current.filter(
      (id) => id !== questionId
    );
    if (unevaluatedQs.current.length === 0 && feedbackResolver.current) {
      feedbackResolver.current(null);
    }
  };

  const getFeedback = () => {
    return questions.current.flatMap(({ id }) => {
      const feedback = feedbackObj.current[id];
      return feedback ? [feedback] : [];
    });
  };

  const goNext = async () => {
    if (stepIdx === STEPS.length - 1) return;
    setStepIdx((i) => i + 1);

    switch (step) {
      case "UPLOAD_CV": {
        if (!localPdfFile || !position) break;
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

        setIsLoading(true);

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
        const { isError: uploadCvError } = await withErrorHandling(() =>
          interviewApis.uploadCV({
            content: cvTextRef.current,
            position,
          })
        );

        if (uploadCvError) return;

        const { isError: isCommonQError, data } = await withErrorHandling(() =>
          interviewApis.getCommonQ()
        );
        if (isCommonQError) return;
        const { behavQuestions, techQuestions } = data;

        const commonQuestions = [
          ...behavQuestions.map(
            (obj): InterviewTypes.Question => ({ ...obj, type: "behav_q" })
          ),
          ...techQuestions.map(
            (obj): InterviewTypes.Question => ({ ...obj, type: "tech_q" })
          ),
        ].toSorted((_a, _b) => Math.random() - 0.5);

        addQuestions(commonQuestions);

        console.log("-----common questions added----");
        askNextQ();
        setIsLoading(false);
        break;
      }

      case "COMMON_Q": {
        console.log("next....feedback....");
        console.log({ feedbackObj, unevaluatedQs });
        setIsLoading(true);

        const { isError: isPersonalQError, data } = await withErrorHandling(
          () => interviewApis.getPersonalQ()
        );
        if (isPersonalQError) return;

        const { personalQuestions } = data;
        addQuestions(
          personalQuestions.map(
            (obj): InterviewTypes.Question => ({ ...obj, type: "personal_q" })
          )
        );
        askNextQ();
        setIsLoading(false);

        break;
      }

      case "PERSONAL_Q": {
        console.log("next....feedback....");
        console.log({ feedbackObj, unevaluatedQs });
        if (!unevaluatedQs.current.length) break;

        setIsLoading(true);
        console.log("기다려 ! ! !! ! !  ! ! ! ! ");
        await new Promise((resolve: (value: null) => void) => {
          feedbackResolver.current = resolve;
        });

        console.log("다왔으");
        setIsLoading(false);
        break;
      }

      default:
        break;
    }
  };

  const startEvaluation = async (qIdx: number, answer: string) => {
    const currentQ = questions.current[qIdx];
    if (!currentQ) return;

    const { id: questionId, type, question } = currentQ;

    const answerFn =
      type === "behav_q"
        ? interviewApis.answerBehavQ
        : type === "tech_q"
        ? interviewApis.answerTechQ
        : interviewApis.answerPersonalQ;

    const { isError: isAnswerError, data: res } = await withErrorHandling(() =>
      answerFn({
        questionId,
        answer,
      })
    );

    console.log({ question, type, res });

    if (isAnswerError) return;

    feedbackObj.current = {
      ...feedbackObj.current,
      [questionId]: res,
    };

    checkEvaluatedQ(questionId);
  };

  const answer = async (answer: string) => {
    console.log("=========ANSWER=====");
    startEvaluation(currentQIdx.current, answer);
    setQuestionsBubbles((prev) => [...prev, { isMine: true, text: answer }]);
    currentQIdx.current === questions.current.length - 1
      ? goNext()
      : askNextQ();

    scrollToBottom();
  };

  const isAfterStep = (isAfter: InterviewTypes.Step) =>
    stepIdx >= STEPS.findIndex((s) => s === isAfter);

  const value: ChatMainContextValue = {
    step,
    goNext,
    questionBubbles,
    setPosition,
    setLanguage: setLang,
    isLoading,
    setLocalPdfFile,
    canGoNext,
    isAfterStep,
    answer,
    scrollToBottom,
    getFeedback,
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
