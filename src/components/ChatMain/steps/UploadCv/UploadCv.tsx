import { Button } from "@chakra-ui/react";
import { useStepContext } from "@contexts";
import { Font, Layout as L } from "@design-system";
import { interviewInfoStore } from "@store";
import React, { useRef, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import * as S from "./UploadCv.styles";

const UploadCv = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const setInterviewInfo = useSetRecoilState(interviewInfoStore);
  const [localPdfFile, setLocalPdfFile] = useState<File | null>(null);
  const cvTextRef = useRef("");

  const { goNext: _goNext } = useStepContext();

  const handleOnFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { files } = e.target;
    if (!files || files.length == 0) return setLocalPdfFile(null);
    setLocalPdfFile(files[0]);
  };

  const canGoNext = !!localPdfFile; //TODO: check job group etc.

  const uploadPdf = async () => {
    return true;
    // if (!canGoNext) return false;
    // pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

    // const document = await pdfjs.getDocument(await localPdfFile.arrayBuffer())
    //   .promise;

    // for (let index of Array.from({ length: document.numPages }, (_, i) => i)) {
    //   const page = await document.getPage(index + 1);
    //   const pageContent = await page.getTextContent();
    //   pageContent.items.map((item) => {
    //     if ("str" in item) {
    //       cvTextRef.current = [cvTextRef.current, item.str].join(" ");
    //     }
    //   });
    // }
    // const { isError: uploadCvError } = await withErrorHandling(
    //   async () => ({})
    //   // TODO
    //   // interviewApis.uploadCV({
    //   //   content: cvTextRef.current,
    //   //   position,
    //   // })
    // );

    // return uploadCvError;
  };

  const goNext = async () => {
    // TODO
    await uploadPdf();
    setInterviewInfo({
      companyId: 1,
      jobGroupId: 1,
      jobId: 1,
    });
    _goNext();
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
          아래 정보를 추가하면 맞춤형 면접 환경을 제공해드려요!
        </Font.Body>

        <S.PdfFileInput
          type={"file"}
          accept=".pdf"
          id="image_uploads"
          ref={fileRef}
          onChange={handleOnFileChange}
          multiple={false}
        />

        <Button disabled={!canGoNext} onClick={goNext}>
          맞춤형 면접 시작하기
        </Button>
      </L.FlexCol>
    </L.FlexCol>
  );
};

export default React.memo(UploadCv);
