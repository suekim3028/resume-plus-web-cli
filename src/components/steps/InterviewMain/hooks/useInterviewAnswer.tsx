import { interviewQuestionsStore } from "@store";
import { InterviewTypes } from "@types";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";

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

  const questionStep = useMemo(() => {
    if (questionIdx === undefined || !questions) return null;
    return questions[questionIdx].type;
  }, [questionIdx, !!questions]);

  const start = () => {
    if (!questions) return;
    setQuestionIdx(0);
    const question = questions[0];
    onQuestion(question);
  };

  const answer = (answer: string) => {
    setChats((prev) => [...prev, { isMine: true, content: answer }]);
    setQuestionIdx((idx) => (idx === undefined ? undefined : idx + 1));
  };

  useEffect(() => {
    if (questionIdx !== undefined && !!questions) {
      const question = questions[questionIdx];
      setChats((chats) => [...chats, questionToChat(question)]);
      onQuestion(question);
    }
  }, [questionIdx]);

  return { chats, questionStep, answer };
};

export default useInterviewAnswer;
