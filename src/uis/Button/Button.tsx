import { FlexProps, TextProps } from "@chakra-ui/react";
import { Icon, IconNames } from "@components";
import { UI } from "@constants";
import Text, { FontType } from "@uis/Text/Text";
import Link from "next/link";
import Flex from "../Flex/Flex";

type Types =
  | "Solid_Primary"
  | "Outlined_Primary"
  | "Outlined_Secondary"
  | "Outlined_Asssertive"
  | "Text_Primary";

const TYPE_SETTINGS: Record<
  Types,
  {
    normalBgColor: UI.ColorKeys;
    // hoveredBgColor: UI.ColorKeys;
    // focusedBgColor: UI.ColorKeys;
    // pressedBgColor: UI.ColorKeys;
    borderColor?: UI.ColorKeys;
    disabledBgColor: UI.ColorKeys;
    disabledBorderColor?: UI.ColorKeys;
    normalTextColor: UI.ColorKeys;
    disabledTextColor: UI.ColorKeys;
  }
> = {
  Solid_Primary: {
    normalBgColor: "Primary/Normal",
    disabledBgColor: "Interaction/Disable",
    normalTextColor: "Static/White",
    disabledTextColor: "Label/Assistive",
  },
  Outlined_Primary: {
    normalBgColor: "Static/White",
    borderColor: "Primary/Normal",
    disabledBgColor: "Static/White",
    disabledBorderColor: "Line/Normal/Normal",
    disabledTextColor: "Label/Disable",
    normalTextColor: "Primary/Normal",
  },
  Outlined_Secondary: {
    normalBgColor: "Static/White",
    borderColor: "Line/Normal/Normal",
    disabledBgColor: "Static/White",
    disabledBorderColor: "Line/Normal/Normal",
    disabledTextColor: "Label/Disable",
    normalTextColor: "Primary/Normal",
  },
  Outlined_Asssertive: {
    normalBgColor: "Static/White",
    borderColor: "Line/Normal/Normal",
    disabledBgColor: "Static/White",
    disabledBorderColor: "Line/Normal/Normal",
    disabledTextColor: "Label/Disable",
    normalTextColor: "Inverse/Label",
  },
  Text_Primary: {
    normalBgColor: "Transparent",
    disabledBgColor: "Transparent",
    disabledTextColor: "Label/Disable",
    normalTextColor: "Primary/Normal",
  },
};

type Sizes = "Large" | "Medium" | "Small";

const SIZE_SETTINGS: Record<
  Sizes,
  {
    borderRadius: number;
    iconSize: number;
    px: number;
    py: number;
    gap: number;
    fontType: FontType;
    fontWeight: string;
  }
> = {
  Large: {
    fontType: "Body1_Normal",
    fontWeight: "600",
    borderRadius: 10,
    iconSize: 20,
    px: 28,
    py: 12,
    gap: 6,
  },
  Medium: {
    fontType: "Body2_Normal",
    fontWeight: "600",
    borderRadius: 8,
    iconSize: 18,
    px: 20,
    py: 9,
    gap: 5,
  },
  Small: {
    fontType: "Label2",
    fontWeight: "600",
    borderRadius: 6,
    iconSize: 16,
    px: 14,
    py: 7,
    gap: 4,
  },
};

const Button = ({
  stretch,
  type,
  size,
  disabled,
  leftIcon,
  rightIcon,
  title,
  onClick,
  href,
  flexProps: _flexProps,
  textProps: _textProps,
}: ButtonProps) => {
  const {
    normalBgColor,
    borderColor,
    disabledBgColor,
    disabledBorderColor,
    normalTextColor,
    disabledTextColor,
  } = TYPE_SETTINGS[type];

  const { bgColor, ...flexProps } = _flexProps || {};
  const { color, ...textProps } = _textProps || {};

  const { borderRadius, iconSize, px, py, gap, fontType, fontWeight } =
    SIZE_SETTINGS[size];

  const currentBorderColor: UI.ColorKeys | undefined = disabled
    ? disabledBorderColor
    : borderColor;

  const currentBgColor =
    bgColor || (disabled ? disabledBgColor : normalBgColor);

  const currentColor =
    color || (disabled ? disabledTextColor : normalTextColor);

  const Component = (
    <Flex
      cursor={!disabled ? "pointer" : undefined}
      w={stretch ? "100%" : "fit-content"}
      bgColor={currentBgColor}
      borderColor={
        currentBorderColor ? UI.COLORS[currentBorderColor] : undefined
      }
      borderStyle={"solid"}
      borderWidth={currentBorderColor ? 1 : 0}
      px={px}
      h={"fit-content"}
      alignItems={"center"}
      justifyContent={"center"}
      py={py}
      gap={gap}
      borderRadius={borderRadius}
      onClick={disabled ? undefined : onClick}
      {...flexProps}
    >
      {leftIcon && <Icon name={leftIcon} size={iconSize} />}

      <Text
        {...textProps}
        type={fontType}
        fontWeight={fontWeight}
        color={currentColor}
      >
        {title}
      </Text>

      {rightIcon && <Icon name={rightIcon} size={iconSize} />}
    </Flex>
  );

  return href ? (
    <Link
      href={href}
      style={{
        width: stretch ? "100%" : "fit-content",
        textDecoration: "none",
        color: currentColor,
      }}
      //   target={openInNewTab ? "_blank" : undefined}
    >
      {Component}
    </Link>
  ) : (
    Component
  );
};

type ButtonProps = {
  stretch?: boolean;
  type: Types;
  disabled?: boolean;
  leftIcon?: IconNames;
  rightIcon?: IconNames;

  size: Sizes;
  onClick?: () => void;
  href?: string;
  title: string;
  flexProps?: Omit<FlexProps, "bgColor"> & { bgColor?: UI.ColorKeys };
  textProps?: Omit<TextProps, "color"> & { color?: UI.ColorKeys };
};

export default Button;
