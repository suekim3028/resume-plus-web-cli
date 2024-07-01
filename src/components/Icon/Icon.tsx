import { Flex } from "@components";
import { L } from "@web-core";

const Icon = ({ name, size, ...flexProps }: IconsProps) => {
  return (
    <Flex {...flexProps}>
      <img
        src={`/icons/${name}.${
          PNG_ICON_NAMES.includes(name as any) ? "png" : "svg"
        }`}
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
        }}
      />
    </Flex>
  );
};

const SVG_ICON_NAMES = ["navigationMypage_LabelStrong"] as const;

const PNG_ICON_NAMES = [""] as const;

export const ICON_NAMES = [...SVG_ICON_NAMES, ...PNG_ICON_NAMES] as const;

export type IconNames = (typeof ICON_NAMES)[number];

type IconsProps = {
  name: IconNames;
  size: number;
} & Pick<L.FlexProps, "m" | "mr" | "ml" | "mt" | "mb" | "mx" | "my">;

export default Icon;
