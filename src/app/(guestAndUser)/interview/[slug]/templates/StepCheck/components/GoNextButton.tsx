import { EventLogger } from "@components";
import { Button } from "@uis";
import { useInterviewQuestionsContext } from "../../../contexts/InterviewQuestionsContext";

const GoNextButton = ({ goNext }: { goNext: () => void }) => {
  const {
    processStats: { durationInMinutes, numberOfQuestions },
  } = useInterviewQuestionsContext();
  return (
    <Button
      onClick={() => {
        goNext();

        EventLogger.log(
          "interview_setting_confirm_button",
          `총 ${numberOfQuestions}개 질문으로 ${durationInMinutes}분간 면접이 진행될 예정이에요`
        );
      }}
      type="Solid_Primary"
      size="Large"
      title="면접 환경 확인하기"
      flexProps={{ width: 384 }}
    />
  );
};
export default GoNextButton;
