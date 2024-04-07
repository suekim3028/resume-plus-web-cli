import { useStepContext } from "@contexts";
import { evaluationFinished } from "@store";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const EvaluationLoading = () => {
  const finished = useRecoilValue(evaluationFinished);

  const { goNext } = useStepContext();
  useEffect(() => {
    if (finished) goNext();
  }, [finished]);

  console.log(finished);
  return <>Evaluation Loading...</>;
};

export default EvaluationLoading;
