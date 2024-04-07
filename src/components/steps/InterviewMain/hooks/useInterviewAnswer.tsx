import { interviewApis } from "@apis";
import { interviewQuestionsStore } from "@store";
import { InterviewTypes } from "@types";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValueLoadable } from "recoil";

type Chat = {
  isMine: boolean;
  content: string;
};

const QUESTION_STEPS: InterviewTypes.QuestionType[] = [
  "perQ",
  "behavQ",
  "techQ",
];

const questionToChat = (question: InterviewTypes.Question): Chat => ({
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
  const [chats, setChats] = useState<Chat[]>([]);

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

  const questionStep = currentQuestion?.type || QUESTION_STEPS[0];

  const start = () => {
    setQuestionIdx(0);
  };

  const answer = (answer: string) => {
    if (!currentQuestion) return;
    setChats((prev) => [...prev, { isMine: true, content: answer }]);
    interviewApis.answerQuestion({
      type: questionStep,
      answer,
      questionId: currentQuestion.id,
    });
    setQuestionIdx((idx) => (idx === undefined ? undefined : idx + 1));
  };

  useEffect(() => {
    if (currentQuestion) {
      setChats((prev) => [...prev, questionToChat(currentQuestion)]);
      onQuestion(currentQuestion);
    }
  }, [currentQuestion?.id]);

  return { chats, questionStep, answer };
};

export default useInterviewAnswer;
