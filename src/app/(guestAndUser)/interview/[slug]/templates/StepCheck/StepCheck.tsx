import Container from "../../../components/Container";
import GoNextButton from "./components/GoNextButton";
import QuestionProgressParts from "./components/ProgressStatByQuestionType";
import TotalQuestionStat from "./components/TotalQuestionStat";

const StepCheck = ({ goNext }: { goNext: () => void }) => {
  return (
    <Container colSpan={8} colStart={3}>
      <TotalQuestionStat />
      <QuestionProgressParts />
      <GoNextButton goNext={goNext} />
    </Container>
  );
};

export default StepCheck;
