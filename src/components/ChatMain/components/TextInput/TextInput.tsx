import { Font, Layout as L } from "@design-system";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

const TextInput = ({
  onFinishAnswer,
}: {
  onFinishAnswer: (answer: string) => void;
}) => {
  const theme = useTheme();

  const [value, setValue] = useState<string[]>([""]);

  const handleClickSend = () => {
    if (!value) return;
    onFinishAnswer(value.join(" "));
  };

  useEffect(() => {
    let recognition: any;

    // @ts-ignore
    // eslint-disable-next-line
    recognition = new (window.SpeechRecognition ||
      // eslint-disable-next-line
      // @ts-ignore
      window.webkitSpeechRecognition)();

    recognition.continuous = true;
    recognition.lang =
      "kohttps://www.notion.so/1-20-44af38cae8cc431e98d4b9ef1eac31f7";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = ({
      results,
    }: {
      results: SpeechRecognitionResultList;
    }) => {
      console.log(results);
      const resultLength = results.length;

      const resultList = Array.from({ length: resultLength }, (_, i) =>
        results.item(i)
      );

      setValue(
        resultList.map((result) => {
          return result.item(0).transcript;
          const items = Array.from({ length: result.length }, (_, i) =>
            result.item(i)
          );
          const maxConf = Math.max(...items.map((i) => i.confidence));
          const maxConfItem =
            items.find((i) => i.confidence === maxConf)?.transcript || "";

          return maxConfItem;
        })
      );
    };

    // recognition.onerror = (e: any) => console.log(e);
    console.log("=========================");
    recognition.start();

    return () => {
      recognition.abort();
    };
  }, []);

  console.log(value);
  return (
    <L.FlexRow
      justifyContent="space-between"
      style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      p={10}
      rounded={20}
      w={"100%"}
    >
      <L.FlexRow flex={1}>
        {value.map((text) => (
          <>{text}</>
        ))}
      </L.FlexRow>
      <L.FlexCol onClick={handleClickSend} bgColor={"PRIMARY_500"}>
        <Font.Body type={"16_semibold_single"} color={"BASIC_WHITE"}>
          answer
        </Font.Body>
      </L.FlexCol>
    </L.FlexRow>
  );
};

export default TextInput;
