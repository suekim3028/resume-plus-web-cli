import { Font, Layout as L } from "@design-system";
import React, { useEffect, useRef, useState } from "react";

const Bubble = ({ isMine, content, onEndTextAnim }: BubbleProps) => {
  const [text, setText] = useState(isMine ? content : content.slice(0, 5));
  const textRef = useRef(content.slice(5));

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!isMine) {
      interval = setInterval(() => {
        if (textRef.current.length === 0 && interval) {
          clearInterval(interval);
          onEndTextAnim();
          return;
        }

        const randNum = Math.floor(Math.random() * 3) + 2;

        const toShow = textRef.current.slice(0, randNum);
        const next = textRef.current.slice(randNum);

        setText((t) => [t, toShow].join(""));
        textRef.current = next;
      }, 80);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <L.FlexRow
      w="100%"
      justifyContent={isMine ? "flex-end" : "flex-start"}
      pb={10}
    >
      <L.FlexRow
        style={{ maxWidth: "90%" }}
        rounded={20}
        bgColor={isMine ? "primary" : "secondary"}
        ph={20}
        pv={10}
      >
        <Font.Body
          type={"14_medium_multi"}
          color={isMine ? "onPrimary" : "onSecondary"}
        >
          {text}
        </Font.Body>
      </L.FlexRow>
    </L.FlexRow>
  );
};

type BubbleProps = {
  content: string;
} & (
  | {
      isMine: true;
      onEndTextAnim?: undefined;
    }
  | {
      isMine: false;
      onEndTextAnim: () => void;
    }
);

export default React.memo(Bubble);