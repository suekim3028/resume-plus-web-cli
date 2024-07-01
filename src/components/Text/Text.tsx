import { UI } from "@constants";
import { TextComponentGenerator } from "web-core-modules/src/layouts";

const Text = TextComponentGenerator({
  factory: {
    Display1: {
      fontFamily: "Pretendard JP",
      fontSize: 56,
      lineHeight: "128.6%",
    },
    Display2: {
      fontFamily: "Pretendard JP",
      fontSize: 40,
      lineHeight: "130%",
    },

    Title1: {
      fontFamily: "Pretendard JP",
      fontSize: 36,
      lineHeight: "133.4%",
    },
    Title2: {
      fontFamily: "Pretendard JP",
      fontSize: 28,
      lineHeight: "135.8%",
    },

    Title3: {
      fontFamily: "Pretendard JP",
      fontSize: 24,
      lineHeight: "133.4%",
    },
    Heading1: {
      fontFamily: "Pretendard JP",
      fontSize: 22,
      lineHeight: "136.4%",
    },
    Heading2: {
      fontFamily: "Pretendard JP",
      fontSize: 20,
      lineHeight: "140%",
    },
    Headline1: {
      fontFamily: "Pretendard JP",
      fontSize: 18,
      lineHeight: "144.5%",
    },
    Headline2: {
      fontFamily: "Pretendard JP",
      fontSize: 17,
      lineHeight: "141.2%",
    },
    Body1_Normal: {
      fontFamily: "Pretendard JP",
      fontSize: 16,
      lineHeight: "150%",
    },
    Body1_Reading: {
      fontFamily: "Pretendard JP",
      fontSize: 16,
      lineHeight: "162.5%",
    },
    Body2_Normal: {
      fontFamily: "Pretendard JP",
      fontSize: 15,
      lineHeight: "146.7",
    },
    Body2_Reading: {
      fontFamily: "Pretendard JP",
      fontSize: 15,
      lineHeight: "160%",
    },
    Label1_Normal: {
      fontFamily: "Pretendard JP",
      fontSize: 14,
      lineHeight: "142.9%",
    },
    Label1_Reading: {
      fontFamily: "Pretendard JP",
      fontSize: 14,
      lineHeight: "157.1%",
    },
    Label2: {
      fontFamily: "Pretendard JP",
      fontSize: 13,
      lineHeight: "138.5%",
    },
    Caption1: {
      fontFamily: "Pretendard JP",
      fontSize: 12,
      lineHeight: "133.4%",
    },
    Caption2: {
      fontFamily: "Pretendard JP",
      fontSize: 11,
      lineHeight: "127.3%",
    },
  },
  colorGenerator: UI.COLORS,
});

export default Text;
