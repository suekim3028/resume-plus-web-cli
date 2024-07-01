import { UI } from "@constants";
import { L } from "@web-core";
import AppHead from "./AppHead/AppHead";
import ChatMain from "./ChatMain/ChatMain";
import FrontCamera from "./FrontCamera/FrontCamera";
import LoadingIndicator from "./LoadingIndicator/LoadingIndicator";
import Login from "./Login/Login";
import TopBarContainer from "./TopBarContainer/TopBarContainer";
import UserOnlyPage from "./UserOnlyPage/UserOnlyPage";

const Flex = L.FlexComponentGenerator(UI.COLORS);

export {
  AppHead,
  ChatMain,
  Flex,
  FrontCamera,
  LoadingIndicator,
  Login,
  TopBarContainer,
  UserOnlyPage,
};
