import { Font, Layout as L } from "@design-system";
import { useEffect, useRef, useState } from "react";

const LoadingIndicator = ({ indicator }: { indicator: string }) => {
  const [phrase, setPhrase] = useState("");
  const idxRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = idxRef.current;
      const nextIdx = idx + Math.floor(Math.random() * 3) + 1;

      setPhrase((p) =>
        idx === 0
          ? indicator.slice(0, nextIdx)
          : [p, indicator.slice(idx, nextIdx)].join("")
      );

      idxRef.current = nextIdx >= indicator.length ? 0 : nextIdx;
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(phrase);

  return (
    <L.LayoutBase p={20}>
      <Font.Body type={"16_semibold_single"} color={"GRAY_500"}>
        {phrase}
      </Font.Body>
    </L.LayoutBase>
  );
};

export default LoadingIndicator;
