import { Font, Layout as L } from "@design-system";
import React, { useEffect, useRef, useState } from "react";

const Bubble = ({ content }: BubbleProps) => {
  const [text, setText] = useState(content.slice(0, 5));
  const textRef = useRef(content.slice(5));

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    interval = setInterval(() => {
      if (textRef.current.length === 0 && interval) {
        clearInterval(interval);
        // if (onEndTextAnim) onEndTextAnim();
        return;
      }

      const randNum = Math.floor(Math.random() * 3) + 2;

      const toShow = textRef.current.slice(0, randNum);
      const next = textRef.current.slice(randNum);

      setText((t) => [t, toShow].join(""));
      textRef.current = next;
    }, 80);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <L.FlexCol
      style={{ backgroundColor: "rgba(255,255,255,0.5)", maxWidth: "40%" }}
      p={10}
      outline={"GRAY_400"}
      rounded={10}
      mb={20}
    >
      <Font.Body
        type={"16_medium_multi"}
        color={"PRIMARY_500"}
        textAlign="center"
      >
        {text}
      </Font.Body>
    </L.FlexCol>
  );
};

type BubbleProps = {
  content: string;
};

export default React.memo(Bubble);
