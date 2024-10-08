"use client";
import { interviewApis } from "@apis";
import {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { textToSpeech } from "./actions";
import { useRecorder } from "./hooks";
import { useInterviewInfoContext } from "./InterviewInfoContext";
import { Chat, RandomQuestion } from "./types";

const InterviewContext = createContext<InterviewContextValue | null>(null);

type InterviewStatus = "DEFAULT" | "FORCE_END" | "END" | "5_MINUTES_LEFT";

type InterviewContextValue = {
  chats: Chat[];
  talkingSide: "COMPANY" | "ME" | null;
  status: InterviewStatus;
  submitAnswerWithText: (answer: string) => void;
  setStatus: (status: InterviewStatus) => void;
  chatScrollRef: RefObject<HTMLDivElement>;
};

const InterviewContextProvider = ({ children }: { children: ReactNode }) => {
  const { questions, interviewInfo } = useInterviewInfoContext();
  const currentQuestion = useRef<RandomQuestion>();
  const remainQuestions = useRef(questions);
  const currentAudio = useRef<HTMLAudioElement>();
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState<Chat[]>([]);
  const [talkingSide, setTalkingSide] = useState<"COMPANY" | "ME" | null>(null);
  const [status, _setStatus] = useState<InterviewStatus>("DEFAULT");

  const canSubmit = useRef(false);

  /**
   * 대답 제출, 채팅 추가, 다음 질문 가져오기
   */

  const submitAnswer = useCallback(
    async (answer: string) => {
      if (!canSubmit.current || status === "END" || status === "FORCE_END")
        return;

      if (!answer) {
        startAnswer();
        return;
      }

      canSubmit.current = false;
      setChats((c) => [...c, { isMine: true, text: answer }]);
      setTimeout(
        () =>
          chatScrollRef.current?.scrollTo({
            top: chatScrollRef.current.clientHeight,
            behavior: "smooth",
          }),
        200
      );

      if (!currentQuestion.current) return;
      interviewApis.answerQuestion({
        questionId: currentQuestion.current.questionId,
        answer,
        type: currentQuestion.current.type,
        interviewId: interviewInfo.interviewId,
      });
      getNextQuestion();
    },
    [status]
  );

  const { startRecorder, resetRecorder } = useRecorder(submitAnswer);

  const setStatus = useCallback(
    (status: InterviewStatus) => {
      if (status === "END" || status === "FORCE_END") {
        resetRecorder();
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
      _setStatus(status);
    },
    [resetRecorder]
  );

  const submitAnswerWithText = useCallback(
    async (text: string) => {
      if (!canSubmit.current) return;

      resetRecorder();
      await submitAnswer(text);
    },
    [resetRecorder, submitAnswer]
  );

  const startAnswer = useCallback(() => {
    setTalkingSide("ME");
    startRecorder();
  }, [startRecorder]);

  /**
   * 다음 질문 가져오기
   */
  const getNextQuestion = useCallback(async () => {
    const nextQuestion = remainQuestions.current.shift();
    if (currentAudio.current) {
      currentAudio.current.removeEventListener("ended", startAnswer);
      currentAudio.current.pause();
    }
    if (!nextQuestion) return setStatus("END");

    currentQuestion.current = nextQuestion;
    setChats((c) => [...c, { isMine: false, text: nextQuestion.question }]);
    canSubmit.current = true;

    setTimeout(
      () =>
        chatScrollRef.current?.scrollTo({
          top: chatScrollRef.current.clientHeight,
          behavior: "smooth",
        }),
      200
    );
    setTalkingSide("COMPANY");
    const data = await textToSpeech(nextQuestion.question);

    if (!data) return startAnswer();

    const audio = new Audio(data);
    currentAudio.current = audio;
    audio.onended = startAnswer;
    audio.play();
  }, [startAnswer, setStatus]);

  const effected = useRef(false);

  useEffect(() => {
    if (effected.current) return;
    effected.current = true;

    setTimeout(getNextQuestion, 1500);
  }, []);

  return (
    <InterviewContext.Provider
      value={{
        chats,
        talkingSide,
        status,

        submitAnswerWithText,
        setStatus,
        chatScrollRef,
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
