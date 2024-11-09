import { interviewApis } from "@apis";
import assert from "assert";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Subject, Subscription } from "rxjs";
import { useInterviewDetailSetting } from "../../../contexts/InterviewDetailSettingContext";
import { useInterviewQuestionsContext } from "../../../contexts/InterviewQuestionsContext";
import { useInterviewStatusWithTimerContext } from "./InterviewStatusWithTimerProvider";
const InterviewContentsContext = createContext<InterviewContentsValue | null>(
  null
);

type InterviewContentsValue = {
  addQuestionEventListener: (cb: (question: string) => void) => Subscription;
  addAnswerEventListener: (cb: (answer: string) => void) => Subscription;
  answerToCurrentQuestion: (answer: string) => void;
  startInterview: () => void;
};

const InterviewContentsProvider = ({ children }: { children: ReactNode }) => {
  const { interviewId } = useInterviewDetailSetting();
  const { sortedQuestionsWithType } = useInterviewQuestionsContext();
  const { finishInterview } = useInterviewStatusWithTimerContext();
  assert(sortedQuestionsWithType.length > 0);

  const currentQuestionIndex = useRef(-1);

  const [$questionObserver] = useState(new Subject<string>());
  const [$answerObserver] = useState(new Subject<string>());

  const postAnswerAPIToCurrentQuestion = useCallback(
    (answer: string) => {
      const _currentQuestion =
        sortedQuestionsWithType[currentQuestionIndex.current];
      return interviewApis.answerQuestion({
        type: _currentQuestion.type,
        questionId: _currentQuestion.questionId,
        answer,
        interviewId,
      });
    },
    [interviewId, sortedQuestionsWithType]
  );

  const broadcastCurrentQuestion = useCallback(() => {
    $questionObserver.next(
      sortedQuestionsWithType[currentQuestionIndex.current].question
    );
  }, [$questionObserver, sortedQuestionsWithType]);

  const broadcastSubmittedAnswer = useCallback(
    (answer: string) => $answerObserver.next(answer),
    [$answerObserver]
  );

  const getAndBroadcastNextQuestion = useCallback(() => {
    if (currentQuestionIndex.current === sortedQuestionsWithType.length - 1) {
      finishInterview();
      return;
    }
    currentQuestionIndex.current = currentQuestionIndex.current + 1;
    broadcastCurrentQuestion();
  }, [sortedQuestionsWithType, broadcastCurrentQuestion]);

  const answerToCurrentQuestion = useCallback(
    (answer: string) => {
      postAnswerAPIToCurrentQuestion(answer);
      broadcastSubmittedAnswer(answer);
      getAndBroadcastNextQuestion();
    },
    [
      postAnswerAPIToCurrentQuestion,
      broadcastSubmittedAnswer,
      getAndBroadcastNextQuestion,
    ]
  );

  const startInterview = useCallback(() => {
    if (currentQuestionIndex.current !== -1) return;
    getAndBroadcastNextQuestion();
  }, [getAndBroadcastNextQuestion]);

  const providerValue: InterviewContentsValue = useMemo(
    () => ({
      addQuestionEventListener: $questionObserver.subscribe,
      addAnswerEventListener: $answerObserver.subscribe,
      answerToCurrentQuestion,
      startInterview,
    }),
    [
      $questionObserver,
      $answerObserver,
      answerToCurrentQuestion,
      startInterview,
    ]
  );

  return (
    <InterviewContentsContext.Provider value={providerValue}>
      {children}
    </InterviewContentsContext.Provider>
  );
};

export const useInterviewContents = () => {
  const context = useContext(InterviewContentsContext);

  if (!context)
    throw new Error(
      "[InterviewContentsContext] UseInterviewContents must be used in provider."
    );
  return context;
};

export default InterviewContentsProvider;
