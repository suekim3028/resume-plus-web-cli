import { Font, Layout as L } from "@design-system";

const GoNextButton = ({
  canGoNext,
  onClick,
}: {
  canGoNext: boolean;
  onClick: () => void;
}) => {
  return (
    <L.FlexRow
      alignItems="center"
      w={"100%"}
      justifyContent="center"
      gap={10}
      pt={40}
    >
      <L.LayoutBase
        onClick={canGoNext ? onClick : undefined}
        bgColor={canGoNext ? "primary" : "secondaryContainer"}
        pv={15}
        w={"80%"}
        ph={30}
        rounded={10}
        alignItems="center"
        hoverBgColor={canGoNext ? "onPrimaryContainer" : undefined}
      >
        <Font.Body
          type={"16_medium_single"}
          ml={2}
          color={canGoNext ? "onPrimary" : "onSecondaryContainer"}
        >
          continue
        </Font.Body>
      </L.LayoutBase>
    </L.FlexRow>
  );
};

export default GoNextButton;
