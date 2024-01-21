import { Font, Layout as L } from "@design-system";
import { InterviewTypes } from "@types";
import React, { useEffect, useRef, useState } from "react";
import { useChatMainContext } from "../../../ChatMainContext";
import Bubble from "../../Bubble/Bubble";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import TextInput from "../../TextInput/TextInput";
import CameraWrapper from "../../CameraWrapper/CameraWrapper";

const CommonQStep: InterviewTypes.Step = "COMMON_Q";
const PersonalQStep: InterviewTypes.Step = "PERSONAL_Q";

const Questions = () => {
  const { step, isAfterStep, questionsRef, currentQIdx, isLoading, answer } =
    useChatMainContext();

  const isCurrentStep = step === CommonQStep || step === PersonalQStep;
  const [isAnswering, setIsAnswering] = useState(false);
  const currentQuestion = questionsRef.current[currentQIdx];

  const speechSynthesisRef = useRef<SpeechSynthesis>();
  const voiceRef = useRef<SpeechSynthesisVoice>();

  useEffect(() => {
    const currentQuestion = questionsRef.current[currentQIdx]?.question;
    setIsAnswering(false);

    if (currentQuestion && isCurrentStep) {
      if (!speechSynthesisRef.current || !voiceRef.current) {
        speechSynthesisRef.current = window.speechSynthesis;
        const voices = speechSynthesisRef.current.getVoices();

        const voice = voices.find((v) => v.lang === "en-US");
        console.log({ voice });
        voiceRef.current = voice;
      }

      setIsAnswering(false);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion);
      utterance.voice = voiceRef.current ?? null;
      window?.speechSynthesis?.speak(utterance);
      utterance.addEventListener("end", () => setIsAnswering(true));
    }

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, [currentQIdx, isCurrentStep]);

  if (!isCurrentStep || !currentQuestion) return <></>;

  return (
    <CameraWrapper>
      <L.FlexCol w={"100%"} p={40} h="100%" justifyContent="space-between">
        {isLoading ? (
          <LoadingIndicator indicator="・ ・ ・ Generating questions" />
        ) : (
          <Bubble content={currentQuestion.question} />
        )}

        {isAnswering && <TextInput />}
      </L.FlexCol>
    </CameraWrapper>
  );
};

export default React.memo(Questions);
