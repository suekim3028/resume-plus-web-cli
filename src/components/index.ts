import { UI } from "@constants";
import { L } from "@web-core";
import Icon, { type IconNames } from "./Icon/Icon";
import Logo from "./Logo/Logo";
import TopBarContainer from "./TopBarContainer/TopBarContainer";

const Flex = L.FlexComponentGenerator(UI.COLORS);

export { Flex, Icon, IconNames, Logo, TopBarContainer };
