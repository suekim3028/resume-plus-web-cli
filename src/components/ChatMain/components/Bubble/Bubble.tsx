import { Font, Layout as L } from "@design-system";

const Bubble = ({ isMine, content }: BubbleProps) => {
  return (
    <L.FlexRow
      w="100%"
      justifyContent={isMine ? "flex-end" : "flex-start"}
      ph={20}
      pb={10}
    >
      <L.FlexRow
        // style={{ minWidth: "60%" }}
        rounded={10}
        bgColor={isMine ? "primary" : "secondary"}
        ph={10}
        pv={10}
      >
        <Font.Body
          type={"14_medium_multi"}
          color={isMine ? "onPrimary" : "onSecondary"}
        >
          {content}
        </Font.Body>
      </L.FlexRow>
    </L.FlexRow>
  );
};

type BubbleProps = {
  isMine: boolean;
  content: string;
};

export default Bubble;
