import { questionAllLoadedStore } from "@store";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useQuestionLoading = () => {
  const questionsAllLoaded = useRecoilValue(questionAllLoadedStore);
};
