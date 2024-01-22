import { Font, Layout as L } from "@design-system";
import { StyleTypes } from "@types";

const InfoRow = ({
  title,
  body,
  mt,
  bgColor,
}: {
  mt?: number;
  title: string;
  bgColor?: StyleTypes.ColorKeys;
  body: string;
}) => {
  return (
    <L.FlexRow mt={mt} alignItems="flex-start" w={"100%"}>
      <L.LayoutBase w={80}>
        <L.LayoutBase
          rounded={20}
          bgColor={bgColor || "GRAY_200"}
          pv={4}
          ph={10}
        >
          <Font.Body type={"14_semibold_single"}>{title}</Font.Body>
        </L.LayoutBase>
      </L.LayoutBase>
      <L.FlexCol flex={1} style={{ margin: "auto" }}>
        <Font.Body
          type={"14_medium_single"}
          ml={8}
          color={"GRAY_800"}
          wordBreak="break-all"
        >
          {body}
        </Font.Body>
      </L.FlexCol>
    </L.FlexRow>
  );
};

export default InfoRow;
