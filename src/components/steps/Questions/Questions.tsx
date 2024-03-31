import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";
import { useStepContext } from "@contexts";
import { Layout as L } from "@design-system";
import { InterviewTypes } from "@types";
import React, { useEffect, useRef, useState } from "react";
const Questions = () => {
  const [currentQuestion, setCurrentQuestion] =
    useState<InterviewTypes.Question | null>(null);

  const [status, setStatus] = useState<"QUESTION" | "ANSWER" | "LOADING">(
    "LOADING"
  );

  const { goNext } = useStepContext();

  const answer = async (text: string) => {
    // if (!currentQuestion) return;
    // InterviewManager.answer(currentQuestion, text);
    // setStatus("LOADING");
    // const question = await InterviewManager.getNextQuestion();
    // if (!question) {
    //   goNext();
    //   return;
    // }
    // setCurrentQuestion(question);
    // setStatus("QUESTION");
  };

  const updateVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang === "ko-KR") || null;
    return voice;
  };

  const voiceRef = useRef<SpeechSynthesisVoice>(null);

  useEffect(() => {
    if (!currentQuestion?.question) return;
    const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
    (async () => {
      var voice = updateVoice();
      if (!voice) {
        await new Promise((resolve: (value: undefined) => void) => {
          setTimeout(resolve, 1000);
        });
      }
      voice = updateVoice();
      utterance.voice = voice;
      window?.speechSynthesis?.speak(utterance);
      utterance.addEventListener("end", () => setStatus("ANSWER"));
    })();

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, [currentQuestion?.question]);

  useEffect(() => {
    (async () => {
      // const question = await InterviewManager.getNextQuestion();
      // setCurrentQuestion(question);
      setStatus("QUESTION");
    })();
  }, []);

  return (
    <L.FlexCol w={"100%"} p={40} h="100%" justifyContent="space-between">
      {status === "LOADING" || !currentQuestion ? (
        <LoadingIndicator indicator="・ ・ ・ Generating questions" />
      ) : (
        <Bubble content={currentQuestion.question} />
      )}

      {status === "ANSWER" && <TextInput onFinishAnswer={answer} />}
    </L.FlexCol>
  );
};

export default React.memo(Questions);
