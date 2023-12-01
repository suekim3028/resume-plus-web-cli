import { StyleTypes } from "@types";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends StyleTypes.ColorTheme {}
}
