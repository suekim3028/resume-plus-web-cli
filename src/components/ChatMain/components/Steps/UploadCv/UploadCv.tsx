import { interviewApis } from "@apis";
import { INTERVIEW_CONSTS } from "@constants";
import { useStepContext } from "@contexts";
import { Font, Layout as L } from "@design-system";
import { langStore, positionStore } from "@store";
import { InterviewTypes } from "@types";
import { withErrorHandling } from "@utils";
import React, { useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { useRecoilState, useRecoilValue } from "recoil";
import GoNextButton from "../../GoNextButton/GoNextButton";
import SelectChips from "../../SelectChips/SelectChips";
import * as S from "./UploadCv.styles";
import { InterviewManager } from "@libs";

const { FIXED_CONVO, POSITION_OPTIONS, POSITION_OPTION_LABEL } =
  INTERVIEW_CONSTS;

const CV_STEP: InterviewTypes.Step = "UPLOAD_CV";

const UploadCv = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const _lang = useRecoilValue(langStore);
  const lang = _lang || "ENG";

  const [position, setPosition] = useRecoilState(positionStore);
  const [localPdfFile, setLocalPdfFile] = useState<File | null>(null);
  const cvTextRef = useRef("");

  const { goNext } = useStepContext();

  const handleOnFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { files } = e.target;
    if (!files || files.length == 0) return setLocalPdfFile(null);
    setLocalPdfFile(files[0]);
  };

  const canGoNext = !!position && !!localPdfFile;

  const uploadPdf = async () => {
    if (!localPdfFile || !position) return false;
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

    const document = await pdfjs.getDocument(await localPdfFile.arrayBuffer())
      .promise;

    for (let index of Array.from({ length: document.numPages }, (_, i) => i)) {
      const page = await document.getPage(index + 1);
      const pageContent = await page.getTextContent();
      pageContent.items.map((item) => {
        if ("str" in item) {
          cvTextRef.current = [cvTextRef.current, item.str].join(" ");
        }
      });
    }
    const { isError: uploadCvError } = await withErrorHandling(() =>
      interviewApis.uploadCV({
        content: cvTextRef.current,
        position,
      })
    );

    return uploadCvError;
  };

  const handleOnClickNext = async () => {
    // TODO: Loading

    await uploadPdf();
    InterviewManager.initQuestions();
    goNext();

    console.log("-----common questions added----");
  };

  return (
    <L.FlexCol
      w={"100%"}
      flex={1}
      pv={30}
      ph={30}
      alignItems="center"
      justifyContent="center"
    >
      <L.FlexCol alignItems="center" w={"60%"}>
        <Font.Body
          type={"16_medium_multi"}
          color={"PRIMARY_500"}
          mb={20}
          textAlign="center"
        >
          {FIXED_CONVO[CV_STEP][lang]}
        </Font.Body>

        <SelectChips<InterviewTypes.Position>
          options={POSITION_OPTIONS.map((value) => ({
            value,
            text: POSITION_OPTION_LABEL[value],
          }))}
          onSelect={setPosition}
        />
        <S.PdfFileInput
          type={"file"}
          accept=".pdf"
          id="image_uploads"
          ref={fileRef}
          onChange={handleOnFileChange}
          multiple={false}
        />
        <GoNextButton onClick={handleOnClickNext} canGoNext={canGoNext} />
      </L.FlexCol>
    </L.FlexCol>
  );
};

export default React.memo(UploadCv);
