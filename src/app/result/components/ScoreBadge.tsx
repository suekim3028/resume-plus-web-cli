import { UI } from "@constants";
import { Flex, Text } from "@uis";
import { useMemo } from "react";

const ScoreBadge = ({
  score,
  size,
}: {
  score: number;
  size: "medium" | "small";
}) => {
  const borderColor = useMemo((): UI.ColorKeys => {
    if (score <= 4) return "Status/Negative";
    if (score <= 7) return "Status/Cautionary";
    return "Status/Positive";
  }, [score]);

  const color = useMemo((): string => {
    if (score <= 4) return "rgba(255, 66, 66, 0.1)";
    if (score <= 7) return "rgba(255, 146, 0, 0.1)";
    return "rgba(0, 191, 64, 0.1)";
  }, [score]);

  return (
    <Flex
      borderColor={UI.COLORS[borderColor]}
      borderWidth={1}
      borderStyle={"solid"}
      borderRadius={10}
      px={size === "medium" ? 8 : 0}
      bgRgbColor={color}
    >
      <Text
        color={borderColor}
        type={size === "medium" ? "Headline1" : "Body2_Normal"}
        fontWeight={"600"}
      >
        {score.toFixed(1)}
      </Text>
    </Flex>
  );
};

export default ScoreBadge;
