import { PopUp } from "@components";
import { Button, Flex, Text } from "@uis";

const PopupTemplate = ({
  title,
  body,
  buttons,
}: {
  title: string;
  body: string;
  buttons: { title: string; onClick: () => void }[];
}) => {
  return (
    <PopUp visible={true}>
      <Flex
        direction={"column"}
        bgColor={"Static/White"}
        rounded={24}
        pt={48}
        pb={24}
        px={61}
        alignItems={"center"}
      >
        <Text type={"Title2"} fontWeight={"700"}>
          {title}
        </Text>
        <Text type={"Body1_Normal"} mt={49} mb={65} textAlign={"center"}>
          {body}
        </Text>
        {buttons.length === 2 ? (
          <Flex gap={16} w="100%">
            <Button
              stretch
              type={"Outlined_Secondary"}
              title={buttons[0].title}
              onClick={buttons[0].onClick}
              size={"Large"}
            />
            <Button
              stretch
              type={"Solid_Primary"}
              title={buttons[1].title}
              onClick={buttons[1].onClick}
              size={"Large"}
            />
          </Flex>
        ) : (
          <Button
            type={"Solid_Primary"}
            title={buttons[0].title}
            onClick={buttons[0].onClick}
            size={"Large"}
          />
        )}
      </Flex>
    </PopUp>
  );
};

export default PopupTemplate;
