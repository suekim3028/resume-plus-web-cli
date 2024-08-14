"use client";
import { interviewApis } from "@apis";
import { InterviewTypes } from "@types";
import { commonHooks } from "@web-core";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { textToSpeech } from "./actions";
import { useRecorder } from "./hooks";
import { Chat, RandomQuestion } from "./types";

const InterviewContext = createContext<InterviewContextValue | null>(null);

type InterviewContextValue = {
  chats: Chat[];
  talkingSide: "COMPANY" | "ME" | null;
  isEnd: boolean;
  interviewInfo: InterviewTypes.InterviewInfo;
  submitAnswerWithText: (answer: string) => void;
};

const InterviewContextProvider = ({
  children,
  questions,
  interviewInfo,
}: {
  children: ReactNode;
  questions: RandomQuestion[];
  interviewInfo: InterviewTypes.InterviewInfo;
}) => {
  const currentQuestion = useRef<RandomQuestion>();
  const remainQuestions = useRef(questions);

  const [chats, setChats] = useState<Chat[]>([]);
  const [talkingSide, setTalkingSide] = useState<"COMPANY" | "ME" | null>(null);
  const [isEnd, setIsEnd] = useState(false);

  /**
   * 대답 제출, 채팅 추가, 다음 질문 가져오기
   */
  const submitAnswer = useCallback(async (answer: string) => {
    setChats((c) => [...c, { isMine: true, text: answer }]);

    if (!currentQuestion.current) return;
    interviewApis.answerQuestion({
      questionId: currentQuestion.current.questionId,
      answer,
      type: currentQuestion.current.type,
      interviewId: interviewInfo.interviewId,
    });
    getNextQuestion();
  }, []);

  const { startRecorder, resetRecorder } = useRecorder(submitAnswer);

  const submitAnswerWithText = useCallback(
    (text: string) => {
      submitAnswer(text);
      resetRecorder();
    },
    [resetRecorder, submitAnswer]
  );

  const startAnswer = () => {
    setTalkingSide("ME");
    startRecorder();
  };

  /**
   * 다음 질문 가져오기
   */
  const getNextQuestion = useCallback(async () => {
    const nextQuestion = remainQuestions.current.shift();
    if (!nextQuestion) return setIsEnd(true);

    currentQuestion.current = nextQuestion;
    setChats((c) => [...c, { isMine: false, text: nextQuestion.question }]);
    setTalkingSide("COMPANY");
    const data = await textToSpeech(nextQuestion.question);
    // const data = "";
    if (!data) return startAnswer();

    const audio = new Audio(data);
    audio.onended = startAnswer;
    audio.play();
  }, []);

  const effected = useRef(false);
  commonHooks.useAsyncEffect(async () => {
    if (effected.current) return;
    effected.current = true;

    setTimeout(getNextQuestion, 1500);
  }, []);

  return (
    <InterviewContext.Provider
      value={{ chats, talkingSide, isEnd, interviewInfo, submitAnswerWithText }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterviewContext = () => {
  const context = useContext(InterviewContext);

  if (!context) throw new Error();
  return context;
};

export default InterviewContextProvider;
