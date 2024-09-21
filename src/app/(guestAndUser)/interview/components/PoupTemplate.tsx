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
  const size = buttons.length === 2 ? "small" : "large";
  return (
    <PopUp visible={true}>
      <Flex
        direction={"column"}
        bgColor={"Static/White"}
        rounded={24}
        w={size === "small" ? 400 : 480}
        alignItems={"center"}
        justifyContent={"space-between"}
        h={size === "small" ? 280 : 320}
        px={size === "small" ? 32 : 0}
        pt={size === "small" ? 40 : 56}
        pb={size === "small" ? 16 : 24}
      >
        <Flex flexDirection={"column"}>
          <Text
            type={size === "small" ? "Heading2" : "Title2"}
            textAlign={"center"}
            fontWeight={size === "small" ? "600" : "700"}
          >
            {title}
          </Text>
          <Text
            pt={size === "small" ? 32 : 42}
            type={size === "small" ? "Label1_Normal" : "Body1_Normal"}
            textAlign={"center"}
          >
            {body}
          </Text>
        </Flex>
        {buttons.length === 2 ? (
          <Flex gap={16} w="100%" pt={size === "small" ? 48 : 0}>
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
