import { INTERVIEW_CONSTS } from "@constants";
import Bubble from "../../Bubble/Bubble";
import { Layout as L } from "@design-system";

const { STEPS } = INTERVIEW_CONSTS;

const Intro = () => {
  return (
    <L.FlexCol w={"100%"}>
      <Bubble
        content={INTERVIEW_CONSTS.FIXED_INTERVIEW_CONTENT[STEPS.INTRO].ENG}
        isMine={false}
      />
    </L.FlexCol>
  );
};

export default Intro;
