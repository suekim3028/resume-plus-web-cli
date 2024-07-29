import { Flex } from "@uis";
import { L } from "@web-core";
import Link from "next/link";

const Icon = ({ name, size, href, ...flexProps }: IconsProps) => {
  const Component = (
    <Flex
      {...flexProps}
      cursor={href || flexProps?.onClick ? "pointer" : undefined}
    >
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

  return href ? (
    <Link
      href={href}
      //   target={openInNewTab ? "_blank" : undefined}
    >
      {Component}
    </Link>
  ) : (
    Component
  );
};

const SVG_ICON_NAMES = [
  "navigationMypage_LabelStrong",
  "logoGoogle",
  "normalEye",
  "normalEyeSlash",
  "normalCircleCheck",
  "normalCircleCheckPrimary",
  "chevronDownAssistive",
  "chevronDownNormal",
  "chevronUpAssistive",
  "chevronUpNormal",
  "chevronUpNegative",
  "chevronDownNegative",
  "normalUpload",
  "normalClose",
  "recording",
  "button_chat_off",
  "button_chat_on",
  "button_exit",
  "button_mic_off",
  "button_mic_on",
  "button_screen_off",
  "button_screen",
  "button_video_off",
  "button_video_on",
  "circleQuestionFill",
  "normalArrowLeft",
  "normalCircleQuestion",
] as const;

const PNG_ICON_NAMES = [""] as const;

export const ICON_NAMES = [...SVG_ICON_NAMES, ...PNG_ICON_NAMES] as const;

export type IconNames = (typeof ICON_NAMES)[number];

type IconsProps = {
  name: IconNames;
  size: number;
  href?: string;
} & Pick<
  L.FlexProps,
  "m" | "mr" | "ml" | "mt" | "mb" | "mx" | "my" | "onClick"
>;

export default Icon;
