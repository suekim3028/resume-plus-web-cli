import { Font, Layout as L } from "@design-system";

const Bubble = ({ isMine, content }: BubbleProps) => {
  return (
    <L.FlexRow w="100%" justifyContent={isMine ? "flex-end" : "flex-start"}>
      <L.FlexRow
        rounded={10}
        bgColor={isMine ? "primary" : "secondary"}
        ph={10}
        pv={10}
      >
        <Font.Body type={"16_medium_multi"}>{content}</Font.Body>
      </L.FlexRow>
    </L.FlexRow>
  );
};

type BubbleProps = {
  isMine: boolean;
  content: string;
};

export default Bubble;
