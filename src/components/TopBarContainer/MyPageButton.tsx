import { useUser } from "@hooks";
import Icon from "../Icon/Icon";

const MyPageButton = () => {
  const { hasUser } = useUser();
  return hasUser ? (
    <Icon name={"navigationMypage_LabelStrong"} size={24} />
  ) : (
    <></>
  );
};

export default MyPageButton;
