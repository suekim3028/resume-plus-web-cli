import { Icon, IconNames } from "@components";
import { UI } from "@constants";
import Text, { FontType } from "@ui/Text/Text";
import Link from "next/link";
import Flex from "../Flex/Flex";

type Types = "Primary" | "Assistive";

const TYPE_SETTINGS: Record<
  Types,
  {
    // hoveredBgColor: UI.ColorKeys;
    // focusedBgColor: UI.ColorKeys;
    // pressedBgColor: UI.ColorKeys;
    normalTextColor: UI.ColorKeys;
    disabledTextColor: UI.ColorKeys;
  }
> = {
  Primary: {
    disabledTextColor: "Label/Disable",
    normalTextColor: "Primary/Normal",
  },
  Assistive: {
    disabledTextColor: "Label/Alternative",
    normalTextColor: "Label/Disable",
  },
};

type Sizes = "Medium" | "Small";

const SIZE_SETTINGS: Record<
  Sizes,
  {
    iconSize: number;
    px: number;
    py: number;
    gap: number;
    fontType: FontType;
    fontWeight: string;
  }
> = {
  Medium: {
    iconSize: 20,
    px: 4,
    py: 0,
    gap: 4,
    fontType: "Body1_Normal",
    fontWeight: "600",
  },
  Small: {
    iconSize: 16,
    px: 4,
    py: 0,
    gap: 4,
    fontWeight: "600",
    fontType: "Label1_Normal",
  },
};

const TextButton = ({
  stretch,
  type,
  size,
  disabled,
  leftIcon,
  rightIcon,
  title,
  onClick,
  href,
}: ButtonProps) => {
  const { normalTextColor, disabledTextColor } = TYPE_SETTINGS[type];

  const { iconSize, px, py, gap, fontType, fontWeight } = SIZE_SETTINGS[size];

  const Component = (
    <Flex
      cursor={(onClick || href) && !disabled ? "pointer" : undefined}
      w={stretch ? "100%" : undefined}
      color={disabled ? disabledTextColor : normalTextColor}
      px={px}
      py={py}
      gap={gap}
      onClick={disabled ? undefined : onClick}
    >
      {leftIcon && <Icon name={leftIcon} size={iconSize} />}
      <Text type={fontType} fontWeight={fontWeight}>
        {title}
      </Text>
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
  title: string;
};

export default TextButton;
