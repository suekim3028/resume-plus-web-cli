import { INTERVIEW_CONSTS } from "@constants";
import Bubble from "../../Bubble/Bubble";
import { Layout as L } from "@design-system";
import SelectChips from "../../SelectChips/SelectChips";
import React, { useRef, useState } from "react";
import { useChatMainContext } from "../../../ChatMainContext";
import { InterviewTypes } from "@types";
import GoNextButton from "../../GoNextButton/GoNextButton";
import * as S from "./UploadCv.styles";

const { FIXED_CONVO, POSITION_OPTIONS, POSITION_OPTION_LABEL } =
  INTERVIEW_CONSTS;

const CV_STEP: InterviewTypes.Step = "UPLOAD_CV";

const UploadCv = () => {
  const { step, isAfterStep, goNext, setPosition, setLocalPdfFile, canGoNext } =
    useChatMainContext();
  const visible = isAfterStep(CV_STEP);
  const isCurrentStep = step === CV_STEP;

  const fileRef = useRef<HTMLInputElement>(null);

  fileRef.current?.files;

  const [textAnimEnd, setTextAnimEnd] = useState(false);

  const handleOnFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { files } = e.target;
    if (!files || files.length == 0) return setLocalPdfFile(null);
    setLocalPdfFile(files[0]);
  };

  if (!visible) return <></>;

  return (
    <L.FlexCol w={"100%"} mt={20}>
      <Bubble
        content={FIXED_CONVO[CV_STEP].ENG}
        isMine={false}
        onEndTextAnim={() => setTextAnimEnd(true)}
      />
      {textAnimEnd && (
        <L.FlexCol w={"100%"}>
          <SelectChips<InterviewTypes.Position>
            options={POSITION_OPTIONS.map((value) => ({
              value,
              text: POSITION_OPTION_LABEL[value],
            }))}
            onSelect={setPosition}
            selectable={isCurrentStep}
          />

          <S.PdfFileInput
            type={"file"}
            accept=".pdf"
            id="image_uploads"
            ref={fileRef}
            disabled={!isCurrentStep}
            onChange={handleOnFileChange}
            multiple={false}
          />
        </L.FlexCol>
      )}

      {isCurrentStep && <GoNextButton onClick={goNext} canGoNext={canGoNext} />}
    </L.FlexCol>
  );
};

export default React.memo(UploadCv);
