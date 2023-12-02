import { Font, Layout as L } from "@design-system";
import { use, useEffect, useMemo } from "react";
import { useChatMainContext } from "../../ChatMainContext";
import { INTERVIEW_CONSTS } from "@constants";
import { StyleTypes } from "@types";

const Feedback = () => {
  const { getFeedback, scrollToBottom } = useChatMainContext();
  const feedbacks = useMemo(() => {
    scrollToBottom();
    return getFeedback();
  }, []);

  return (
    <L.FlexRow
      gap={20}
      w={"100%"}
      style={{ flexWrap: "wrap" }}
      //   alignItems={"center"}
      justifyContent="center"
    >
      {feedbacks.map(({ question, user_answer, evaluation, type }) => {
        const oneEvaluation = evaluation[0];

        return (
          <L.FlexCol
            style={{ width: "80%", maxWidth: 400 }}
            key={question.slice(10)}
            bgColor={"BASIC_WHITE"}
            rounded={15}
            ph={20}
            pv={20}
          >
            <Font.Body type={"12_medium_single"} color={"GRAY_500"}>
              {INTERVIEW_CONSTS.QUESTION_TYPE_LABEL[type]}
            </Font.Body>
            <Font.Body
              type={"16_semibold_multi"}
              color={"PRIMARY_500"}
              mt={4}
            >{`Q. ${question}`}</Font.Body>

            <Font.Body
              type={"16_medium_multi"}
              color={"GRAY_900"}
              mt={4}
            >{`A. ${user_answer}`}</Font.Body>

            {evaluation.length > 1 ? (
              <></>
            ) : (
              <>
                <InfoRow
                  title={"criteria"}
                  body={oneEvaluation.criteria}
                  mt={20}
                />
                <InfoRow
                  title={"score"}
                  body={`${oneEvaluation.score}`}
                  mt={10}
                  bgColor={"PRIMARY_100"}
                />
                <InfoRow
                  title={"rationale"}
                  body={oneEvaluation.rationale}
                  mt={10}
                />
              </>
            )}
          </L.FlexCol>
        );
      })}
    </L.FlexRow>
  );
};

const InfoRow = ({
  title,
  body,
  mt,
  bgColor,
}: {
  mt?: number;
  title: string;
  bgColor?: StyleTypes.ColorKeys;
  body: string;
}) => {
  return (
    <L.FlexRow mt={mt} alignItems="center" w={"100%"}>
      <L.LayoutBase w={80}>
        <L.LayoutBase
          rounded={20}
          bgColor={bgColor || "GRAY_200"}
          pv={4}
          ph={10}
        >
          <Font.Body type={"14_semibold_single"}>{title}</Font.Body>
        </L.LayoutBase>
      </L.LayoutBase>
      <L.LayoutBase flex={1}>
        <Font.Body
          type={"14_medium_single"}
          ml={8}
          color={"GRAY_800"}
          wordBreak="break-all"
        >
          {body}
        </Font.Body>
      </L.LayoutBase>
    </L.FlexRow>
  );
};

export default Feedback;
