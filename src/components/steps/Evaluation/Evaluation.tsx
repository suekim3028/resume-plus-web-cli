import { Font, Layout as L } from "@design-system";
import { InterviewTypes } from "@types";
import React, { useState } from "react";
import { isScoreEval } from "./Evaluation.utils";

const Evaluation = () => {
  const [feedbacks, setFeedbacks] = useState<InterviewTypes.Feedback[] | null>(
    null
  );

  // useEffect(() => {
  //   (async () => {
  //     setFeedbacks(await InterviewManager.getFeedbackArr());
  //   })();
  // }, []);

  if (!feedbacks)
    return (
      <L.FlexCol w={"100%"} mt={20}>
        Analyzing your responses for feedback...
      </L.FlexCol>
    );

  return (
    <L.FlexCol w={"100%"} flex={1} bgColor="GRAY_200" pv={20}>
      <L.FlexRow
        w={"100%"}
        gap={20}
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
              <Font.Body
                type={"12_medium_single"}
                color={"GRAY_500"}
              ></Font.Body>
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
                  {/* <InfoRow
                    title={"score"}
                    body={`${evaluation.score}`}
                    mt={10}
                    bgColor={"PRIMARY_100"}
                  />
                  <InfoRow
                    title={"rationale"}
                    body={evaluation.rationale}
                    mt={10}
                  /> */}
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
                        {/* <InfoRow
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
                        <InfoRow title={"rationale"} body={rationale} mt={10} /> */}
                      </L.FlexCol>
                    );
                  })}{" "}
                </>
              )}
            </L.FlexCol>
          );
        })}
      </L.FlexRow>
    </L.FlexCol>
  );
};

export default React.memo(Evaluation);
