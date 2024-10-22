import { pdfjs } from "react-pdf";

export const getTextFromPdf = async (file: File): Promise<string> => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const document = await pdfjs.getDocument(await file.arrayBuffer()).promise;

  const textArr: string[] = [];

  for (let index of Array.from({ length: document.numPages }, (_, i) => i)) {
    const page = await document.getPage(index + 1);
    const pageContent = await page.getTextContent();
    pageContent.items.map((item) => {
      if ("str" in item) {
        textArr.push(item.str);
      }
    });
  }
  return textArr.join(" ");
};
