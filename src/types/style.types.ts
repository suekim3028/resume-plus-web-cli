export type ColorTheme = {
  GRAY_900: string;
  GRAY_800: string;
  GRAY_700: string;
  GRAY_600: string;
  GRAY_500: string;
  GRAY_400: string;
  GRAY_300: string;
  GRAY_200: string;
  GRAY_100: string;
  GRAY_50: string;
  BASIC_BLACK: string;
  BASIC_WHITE: string;
  PRIMARY_500: string;
  PRIMARY_400: string;
  PRIMARY_300: string;
  PRIMARY_200: string;
  PRIMARY_100: string;
};

export type ColorKeys = keyof ColorTheme;

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export type ColorProp = ColorKeys | Color;
