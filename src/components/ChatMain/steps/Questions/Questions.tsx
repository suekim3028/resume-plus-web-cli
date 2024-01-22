import { useStepContext } from "@contexts";
import { Layout as L } from "@design-system";
import { InterviewManager } from "@libs";
import { InterviewTypes } from "@types";
import React, { useEffect, useRef, useState } from "react";
import Bubble from "../../components/Bubble/Bubble";
import CameraWrapper from "../../components/CameraWrapper/CameraWrapper";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import TextInput from "../../components/TextInput/TextInput";
import { useRecoilValue } from "recoil";
import { langStore } from "@store";

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] =
    useState<InterviewTypes.Question | null>(null);

  const [status, setStatus] = useState<"QUESTION" | "ANSWER" | "LOADING">(
    "LOADING"
  );
  const _lang = useRecoilValue(langStore);
  const lang = _lang || "ENG";

  const { goNext } = useStepContext();

  const speechSynthesisRef = useRef<SpeechSynthesis>();
  const voiceRef = useRef<SpeechSynthesisVoice>();

  const answer = async (text: string) => {
    if (!currentQuestion) return;
    InterviewManager.answer(currentQuestion, text);

    setStatus("LOADING");
    const question = await InterviewManager.getNextQuestion();

    if (!question) {
      goNext();
      return;
    }

    setCurrentQuestion(question);
    setStatus("QUESTION");
  };

  const updateVoice = () => {
    if (!!voiceRef.current) return;
    speechSynthesisRef.current = window.speechSynthesis;
    const voices = speechSynthesisRef.current.getVoices();
    const voice = voices.find(
      (v) => v.lang === (lang === "ENG" ? "en-US" : "ko")
    );
    voiceRef.current = voice;
  };

  useEffect(() => {
    window.speechSynthesis.cancel();
    if (!currentQuestion?.question) return;
    const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
    updateVoice();
    utterance.voice = voiceRef.current ?? null;
    window?.speechSynthesis?.speak(utterance);
    utterance.addEventListener("end", () => setStatus("ANSWER"));

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, [currentQuestion?.question]);

  useEffect(updateVoice, []);

  useEffect(() => {
    (async () => {
      const question = await InterviewManager.getNextQuestion();
      setCurrentQuestion(question);
      setStatus("QUESTION");
    })();
  }, []);

  return (
    <CameraWrapper>
      <L.FlexCol w={"100%"} p={40} h="100%" justifyContent="space-between">
        {status === "LOADING" || !currentQuestion ? (
          <LoadingIndicator indicator="・ ・ ・ Generating questions" />
        ) : (
          <Bubble content={currentQuestion.question} />
        )}

        {status === "ANSWER" && <TextInput onFinishAnswer={answer} />}
      </L.FlexCol>
    </CameraWrapper>
  );
};

export default React.memo(Questions);
