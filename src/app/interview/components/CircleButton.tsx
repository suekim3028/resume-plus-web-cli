import { Icon, IconNames } from "@components";
import { Flex } from "@uis";

const CircleButton = ({ icon, onClick }: CircleButtonProps) => {
  return (
    <Flex
      w={64}
      h={64}
      cursor={"pointer"}
      onClick={onClick}
      borderRadius={32}
      bgRgbColor="rgba(217, 217, 217, 0.2)"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Icon name={icon} size={24} />
    </Flex>
  );
};

export type CircleButtonProps = {
  icon: IconNames;
  onClick: () => void;
};

export default CircleButton;
