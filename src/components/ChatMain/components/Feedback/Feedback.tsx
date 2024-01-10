import { INTERVIEW_CONSTS } from "@constants";
import { Font, Layout as L } from "@design-system";
import { StyleTypes } from "@types";
import { useMemo } from "react";
import { useChatMainContext } from "../../ChatMainContext";
import { isScoreEval } from "./Feedback.utils";

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
      justifyContent="center"
    >
      {feedbacks.map(({ question, user_answer, evaluation, type }) => {
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

            {!!evaluation && isScoreEval(evaluation) && (
              <>
                <InfoRow
                  title={"score"}
                  body={`${evaluation.score}`}
                  mt={10}
                  bgColor={"PRIMARY_100"}
                />
                <InfoRow
                  title={"rationale"}
                  body={evaluation.rationale}
                  mt={10}
                />
              </>
            )}

            {!!evaluation && !isScoreEval(evaluation) && (
              <>
                {Object.keys(evaluation).map((criteria, idx) => {
                  const [_score, rationale] = evaluation[criteria];
                  const score = Number(_score);

                  return (
                    <L.FlexCol
                      w={"100%"}
                      key={criteria}
                      pt={idx === 0 ? 0 : 20}
                    >
                      {idx !== 0 && (
                        <L.LayoutBase w={"100%"} h={1} bgColor="GRAY_200" />
                      )}
                      <InfoRow
                        title={"criteria"}
                        body={criteria || ""}
                        mt={20}
                      />
                      <InfoRow
                        title={"score"}
                        body={`${score}`}
                        mt={10}
                        bgColor={"PRIMARY_100"}
                      />
                      <InfoRow title={"rationale"} body={rationale} mt={10} />
                    </L.FlexCol>
                  );
                })}{" "}
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
    <L.FlexRow mt={mt} alignItems="flex-start" w={"100%"}>
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
      <L.FlexCol flex={1} style={{ margin: "auto" }}>
        <Font.Body
          type={"14_medium_single"}
          ml={8}
          color={"GRAY_800"}
          wordBreak="break-all"
        >
          {body}
        </Font.Body>
      </L.FlexCol>
    </L.FlexRow>
  );
};

export default Feedback;
