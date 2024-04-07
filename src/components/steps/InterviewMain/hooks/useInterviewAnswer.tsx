import { interviewApis } from "@apis";
import { evaluationStore, interviewQuestionsStore } from "@store";
import { InterviewTypes } from "@types";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";

const QUESTION_STEPS: InterviewTypes.QuestionType[] = [
  "perQ",
  "behavQ",
  "techQ",
];

const questionToChat = (
  question: InterviewTypes.Question
): InterviewTypes.Chat => ({
  isMine: false,
  content: question.question,
});

const useInterviewAnswer = ({
  onQuestion,
}: {
  onQuestion: (question: InterviewTypes.Question) => void;
}) => {
  const _questions = useRecoilValueLoadable(interviewQuestionsStore);
  const [questionIdx, setQuestionIdx] = useState<number>();
  const [chats, setChats] = useState<InterviewTypes.Chat[]>([]);

  const setEvaluation = useSetRecoilState(evaluationStore);

  const questions = useMemo(() => {
    if (_questions.state !== "hasValue") return null;
    const qs = _questions.getValue();
    if (!qs) return null;
    return QUESTION_STEPS.flatMap((qType) =>
      qs[qType].map((q) => ({ type: qType, ...q }))
    );
  }, [_questions.state]);

  const currentQuestion = useMemo(() => {
    if (questionIdx === undefined) return null;
    if (!questions) return null;
    return questions[questionIdx];
  }, [questionIdx, !!_questions]);

  const isLastQuestion =
    !!questions &&
    questionIdx != undefined &&
    questionIdx === questions.length - 1;

  const questionStep = currentQuestion?.type || QUESTION_STEPS[0];

  const startInterview = () => {
    setQuestionIdx(0);
  };

  const answer = (answer: string) => {
    if (!currentQuestion) return { isError: true, isEnd: false };
    setChats((prev) => [...prev, { isMine: true, content: answer }]);

    (async () => {
      const feedback = await interviewApis.answerQuestion({
        type: questionStep,
        answer,
        questionId: currentQuestion.id,
      });
      setEvaluation((prev) => [...prev, feedback]);
    })();

    if (!isLastQuestion) {
      setQuestionIdx((idx) => (idx === undefined ? undefined : idx + 1));
    }
    return { isError: false, isEnd: isLastQuestion };
  };

  useEffect(() => {
    if (currentQuestion) {
      setChats((prev) => [...prev, questionToChat(currentQuestion)]);
      onQuestion(currentQuestion);
    }
  }, [currentQuestion?.id]);

  const waitForFeedback = async () => {};

  return { chats, questionStep, answer, startInterview, waitForFeedback };
};

export default useInterviewAnswer;
