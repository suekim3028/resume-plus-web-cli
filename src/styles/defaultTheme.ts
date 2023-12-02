import { StyleTypes } from "@types";

const defaultThemeLight: StyleTypes.ColorTheme = {
  GRAY_900: "#080a0b",
  GRAY_800: "#101317",
  GRAY_700: "#191d22",
  GRAY_600: "#777777",
  GRAY_500: "#AAAAAA",
  GRAY_400: "#CCCCCC",
  GRAY_300: "#DDDDDD",
  GRAY_200: "#EEEEEE",
  GRAY_100: "#F5F5F5",
  GRAY_50: "#FAFAFA",
  BASIC_BLACK: "#000000",
  BASIC_WHITE: "#FFFFFF",
  PRIMARY_500: "#001C45",
  PRIMARY_400: "#114697",
  PRIMARY_300: "#4E8CE8",
  PRIMARY_200: "#73ABFE",
  PRIMARY_100: "#CFE2FF",
} as const;

export { defaultThemeLight };
