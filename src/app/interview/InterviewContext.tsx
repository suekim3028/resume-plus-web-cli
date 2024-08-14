"use client";
import { interviewApis } from "@apis";
import { InterviewTypes } from "@types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { textToSpeech } from "./actions";
import { useRecorder } from "./hooks";
import { Chat, RandomQuestion } from "./types";

const InterviewContext = createContext<InterviewContextValue | null>(null);

type InterviewStatus = "DEFAULT" | "FORCE_END" | "END" | "5_MINUTES_LEFT";

type InterviewContextValue = {
  chats: Chat[];
  talkingSide: "COMPANY" | "ME" | null;
  status: InterviewStatus;
  interviewInfo: InterviewTypes.InterviewInfo;
  submitAnswerWithText: (answer: string) => void;
  setStatus: (status: InterviewStatus) => void;
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
  const [status, setStatus] = useState<InterviewStatus>("DEFAULT");

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
    if (!nextQuestion) return setStatus("END");

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

  useEffect(() => {
    if (effected.current) return;
    effected.current = true;

    // setTimeout(getNextQuestion, 1500);
  }, []);

  return (
    <InterviewContext.Provider
      value={{
        chats,
        talkingSide,
        status,
        interviewInfo,
        submitAnswerWithText,
        setStatus,
      }}
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
