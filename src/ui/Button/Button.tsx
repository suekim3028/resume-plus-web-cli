import { Icon, IconNames } from "@components";
import { UI } from "@constants";
import Link from "next/link";
import { ReactNode } from "react";
import Flex from "../Flex/Flex";

type Types =
  | "Solid_Primary"
  | "Outlined_Primary"
  | "Outlined_Secondary"
  | "Outlined_Asssertive";

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
  }
> = {
  Large: {
    borderRadius: 10,
    iconSize: 20,
    px: 28,
    py: 12,
    gap: 6,
  },
  Medium: {
    borderRadius: 8,
    iconSize: 18,
    px: 20,
    py: 9,
    gap: 5,
  },
  Small: {
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
  children,
  onClick,
  href,
}: ButtonProps) => {
  const {
    normalBgColor,
    // hoveredBgColor,
    // focusedBgColor,
    // pressedBgColor,
    borderColor,
    disabledBgColor,
    disabledBorderColor,
    normalTextColor,
    disabledTextColor,
  } = TYPE_SETTINGS[type];

  const { borderRadius, iconSize, px, py, gap } = SIZE_SETTINGS[size];
  const currentBorderColor = disabled ? disabledBorderColor : borderColor;

  const Component = (
    <Flex
      cursor={(onClick || href) && !disabled ? "pointer" : undefined}
      w={stretch ? "100%" : undefined}
      bgColor={disabled ? disabledBgColor : normalBgColor}
      color={disabled ? disabledTextColor : normalTextColor}
      borderColor={currentBorderColor}
      borderStyle={"solid"}
      borderWidth={currentBorderColor ? 1 : 0}
      px={px}
      py={py}
      gap={gap}
      borderRadius={borderRadius}
      onClick={disabled ? undefined : onClick}
    >
      {leftIcon && <Icon name={leftIcon} size={iconSize} />}
      {children}
      {rightIcon && <Icon name={rightIcon} size={iconSize} />}
    </Flex>
  );

  return href ? (
    <Link
      href={href}
      style={{ width: stretch ? "100%" : "fit-content" }}
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
} & { children: ReactNode };
