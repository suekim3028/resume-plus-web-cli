import { interviewApis } from "@apis";
import { INTERVIEW_CONSTS } from "@constants";
import { InterviewTypes } from "@types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { pdfjs } from "react-pdf";
import CommonQ from "./components/Steps/Questions/Questions";
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

  const questions = useRef<InterviewTypes.Question[]>([]);
  const currentQIdx = useRef(-1);

  const unevaluatedQs = useRef<number[]>([]);
  const evaluations = useRef<Record<number, InterviewTypes.Evaluation[]>>({});

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

  const askNextQ = () => {
    console.log("ASK NEXT  Q");
    currentQIdx.current++;
    console.log(questions.current[currentQIdx.current].question);
    setQuestionsBubbles((prev) => [
      ...prev,
      { isMine: false, text: questions.current[currentQIdx.current].question },
    ]);
  };

  const addQuestions = (newQ: InterviewTypes.Question[]) => {
    console.log(
      " ADD QUESTIONS ! ",
      newQ.map(({ id }) => id)
    );
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

          const { behavQuestions, techQuestions } =
            await interviewApis.getCommonQ();

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
        })();
        break;
      }

      case "COMMON_Q": {
        console.log("next....feedback....");
        console.log({ evaluations, unevaluatedQs });
        setIsLoading(true);
        (async () => {
          const { personalQuestions } = await interviewApis.getPersonalQ();
          addQuestions(
            personalQuestions.map(
              (obj): InterviewTypes.Question => ({ ...obj, type: "personal_q" })
            )
          );
          askNextQ();
          setIsLoading(false);
        })();
        break;
      }

      case "PERSONAL_Q": {
        console.log("next....feedback....");
        console.log({ evaluations, unevaluatedQs });
        if (!unevaluatedQs.current.length) break;
        (async () => {
          setIsLoading(true);
          console.log("기다려 ! ! !! ! !  ! ! ! ! ");
          await new Promise((resolve: (value: null) => void) => {
            feedbackResolver.current = resolve;
          });

          console.log("다왔으");
          setIsLoading(false);
        })();
        break;
      }

      default:
        break;
    }
    setStepIdx((i) => i + 1);
  };

  const startEvaluation = async (answer: string) => {
    const currentQ = questions.current[currentQIdx.current];
    if (!currentQ) return;

    const { id: questionId, type } = currentQ;

    switch (type) {
      case "behav_q": {
        const { evaluation } = await interviewApis.answerBehavQ({
          questionId,
          answer,
        });

        evaluations.current = {
          ...evaluations.current,
          [questionId]: [evaluation],
        };
        break;
      }
      case "tech_q": {
        const { evaluation } = await interviewApis.answerTechQ({
          questionId,
          answer,
        });
        evaluations.current = {
          ...evaluations.current,
          [questionId]: [evaluation],
        };
        break;
      }
      case "personal_q": {
        const { evaluation } = await interviewApis.answerPersonalQ({
          questionId,
          answer,
        });
        evaluations.current = {
          ...evaluations.current,
          [questionId]: evaluation.evaluation,
        };
        break;
      }
    }

    checkEvaluatedQ(questionId);
  };

  const answer = async (answer: string) => {
    console.log("=========ANSWER=====");
    startEvaluation(answer);
    setQuestionsBubbles((prev) => [...prev, { isMine: true, text: answer }]);
    currentQIdx.current === questions.current.length - 1
      ? goNext()
      : askNextQ();
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
