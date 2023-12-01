import { StyleTypes } from "@types";
import styled from "styled-components";

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

type FlexProps = Partial<{
  w: number | string;
  h: number | string;
  p: number;
  pl: number;
  pr: number;
  pt: number;
  pb: number;
  m: number;
  ml: number;
  mr: number;
  mt: number;
  mb: number;
  bgColor: StyleTypes.ColorKeys | Color;
}>;

const Flex = styled.div<FlexProps>`
  display: flex;
  width: ${({ w }) => (typeof w === "number" ? `${w}px` : w)};
  height: ${({ h }) => (typeof h === "number" ? `${h}px` : h)};
  padding: ${({ p, pl, pt, pb, pr }) =>
    p ? `${p}px` : `${pt ?? 0}px ${pr ?? 0}px ${pb ?? 0}px ${pl ?? 0}px`};
  margin: ${({ m, ml, mt, mb, mr }) =>
    m ? `${m}px` : `${mt ?? 0}px ${mr ?? 0}px ${mb ?? 0}px ${ml ?? 0}px`};
  background-color: ${({ bgColor, theme }) =>
    // @ts-ignore
    bgColor ? theme[bgColor] || bgColor : "transparent"};
`;

export const FlexRow = styled(Flex)`
  flex-direction: row;
`;

export const FlexCol = styled(Flex)`
  flex-direction: row;
`;
