import { interviewApis } from "@apis";
import { commonHooks } from "@web-core";
import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { speechToText, textToSpeech } from "./actions";
import { Chat, RandomQuestion } from "./types";
import { audioBlobToBase64 } from "./utils";

const InterviewContext = createContext<InterviewContextValue | null>(null);

type InterviewContextValue = {
  chats: Chat[];
  talkingSide: "COMPANY" | "ME" | null;
};

const InterviewContextProvider = ({
  children,
  questions,
}: {
  children: ReactNode;
  questions: RandomQuestion[];
}) => {
  const currentQuestion = useRef<RandomQuestion>();
  const remainQuestions = useRef(questions);

  const mediaStream = useRef<MediaStream>();
  const mediaRecorder = useRef<MediaRecorder>();

  const [chats, setChats] = useState<Chat[]>([]);
  const [talkingSide, setTalkingSide] = useState<"COMPANY" | "ME" | null>(null);

  const submitAnswer = async (answer: string) => {
    if (!currentQuestion.current) return;
    interviewApis.answerQuestion({
      questionId: currentQuestion.current.id,
      answer,
      type: currentQuestion.current.type,
    });
    getNextQuestion();
  };

  const getNextQuestion = async () => {
    console.log({ remainQuestions: remainQuestions.current });
    const nextQuestion = remainQuestions.current.shift();
    if (!nextQuestion) return;
    currentQuestion.current = nextQuestion;
    setChats((c) => [...c, { isMine: false, text: nextQuestion.question }]);
    setTalkingSide("COMPANY");
    const data = await textToSpeech(nextQuestion.question);
    if (!data) return;
    const audio = new Audio(data);
    audio.onended = () => {
      startRecord();
    };
    audio.play();

    // sampleAudio(() => {
    //   startRecord();
    // });
  };

  const resetMediaRecorder = () => {
    if (!mediaStream.current) return;
    const _mediaRecorder = new MediaRecorder(mediaStream.current);
    stackedData.current = [];
    _mediaRecorder.ondataavailable = (ev) => {
      if (ev.data.size <= 0) return;
      stackedData.current.push(ev.data);
    };

    _mediaRecorder.onstop = async () => {
      console.log("녹음 ~ ~ ~ ~ 끝!");
      if (!stackedData.current.length) return;

      const blob = new Blob(stackedData.current);
      const base64Audio = await audioBlobToBase64(blob);

      const text = await speechToText(base64Audio);

      getNextQuestion();
      console.log({ text });
    };

    mediaRecorder.current = _mediaRecorder;
  };

  const resetMediaStream = async () => {
    mediaStream.current = await navigator.mediaDevices?.getUserMedia({
      video: false,
      audio: true,
    });

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(mediaStream.current);
    console.log(source);

    analyzer.current = audioContext.createAnalyser();
    source.connect(analyzer.current);
  };

  const effected = useRef(false);

  const stackedData = useRef<Blob[]>([]);
  const analyzer = useRef<AnalyserNode>();

  const fiveSeconds = useRef<NodeJS.Timeout | null>(null);
  const interval = useRef<NodeJS.Timeout | null>(null);

  function getPeakLevel() {
    if (!analyzer.current) return 0;
    const array = new Uint8Array(analyzer.current.fftSize);

    analyzer.current.getByteTimeDomainData(array);
    return (
      array.reduce(
        (max, current) => Math.max(max, Math.abs(current - 127)),
        0
      ) / 128
    );
  }

  const startRecord = async () => {
    if (!mediaRecorder.current) return;
    setTalkingSide("ME");

    resetMediaRecorder();
    interval.current = setInterval(() => {
      const level = getPeakLevel();

      if (level > 0.05) {
        console.log("----- timeout 리셋");
        // 5% 이상이면 계속 들음
        fiveSeconds.current && clearTimeout(fiveSeconds.current);
        fiveSeconds.current = setTimeout(() => {
          console.log("----timout 끝!!!");
          interval.current && clearInterval(interval.current);
          mediaRecorder.current?.stop();
          fiveSeconds.current && clearTimeout(fiveSeconds.current);
        }, 3000);
      }
    }, 200);

    // 음성 녹음
    mediaRecorder.current.start();
    console.log("녹음 ~ ~ ~ ~ 시작!");
  };

  commonHooks.useAsyncEffect(async () => {
    if (effected.current) return;
    effected.current = true;

    await resetMediaStream();
    resetMediaRecorder();

    setTimeout(() => {
      getNextQuestion();
    }, 1500);
  }, []);

  return (
    <InterviewContext.Provider value={{ chats, talkingSide }}>
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
