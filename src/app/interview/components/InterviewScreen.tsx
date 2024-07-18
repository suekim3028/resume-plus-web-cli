/* eslint-disable jsx-a11y/alt-text */
import { Grid, GridItem } from "@chakra-ui/react";
import { Icon, IconNames } from "@components";
import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";
import { useState } from "react";
import { RandomQuestion } from "../types";
import Container from "./Container";
import FrontCamera from "./FrontCamera";

const InterviewScreen = ({
  interviewInfo,
  questions,
}: {
  interviewInfo: InterviewTypes.InterviewInfo;
  questions: RandomQuestion[];
}) => {
  const { company, job, department } = interviewInfo;
  const [setting, setSetting] = useState({
    mic: false,
    video: false,
    chat: false,
  });

  const buttons: ButtonProps[] = [
    {
      icon: `button_mic_${setting.mic ? "on" : "off"}`,
      onClick: () => setSetting((p) => ({ ...p, mic: !p.mic })),
    },
    {
      icon: `button_video_${setting.video ? "on" : "off"}`,
      onClick: () => setSetting((p) => ({ ...p, video: !p.video })),
    },
    {
      icon: `button_chat_${setting.chat ? "on" : "off"}`,
      onClick: () => setSetting((p) => ({ ...p, chat: !p.chat })),
    },
  ];

  return (
    <Container colSpan={12} colStart={1}>
      <Flex
        flex={1}
        w="100%"
        direction="column"
        bgRgbColor={"rgba(131, 131, 132, 1)"}
        borderRadius={24}
        overflow={"hidden"}
      >
        <Flex
          justifyContent={"space-between"}
          bgColor={"Line/Solid/Normal"}
          zIndex={2}
        >
          <Grid templateColumns={"repeat(12, 1fr)"} w="100%" gap={24}>
            <GridItem colStart={1} alignItems={"center"} display={"flex"}>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  width={64}
                  height={64}
                  src={""}
                  style={{ width: 64, height: 64 }}
                />
              }
            </GridItem>
            <GridItem colStart={2} alignItems={"center"} display={"flex"}>
              <Text
                type="Body1_Normal"
                color={"Label/Alternative"}
                fontWeight={"600"}
              >
                {company.name}
              </Text>
            </GridItem>
            <GridItem colStart={3} alignItems={"center"} display={"flex"}>
              <Text
                type="Body1_Normal"
                color={"Label/Alternative"}
                fontWeight={"600"}
              >
                {department.department}
              </Text>
            </GridItem>
            <GridItem colStart={11} alignItems={"center"} display={"flex"}>
              <Icon name="recording" size={32} />
              <Text
                type="Body1_Normal"
                color={"Label/Alternative"}
                fontWeight={"600"}
              >
                녹화중
              </Text>
            </GridItem>
            <GridItem colStart={12} alignItems={"center"} display={"flex"}>
              <Text
                type="Body1_Normal"
                color={"Label/Alternative"}
                fontWeight={"600"}
              >
                {"00:00"}
              </Text>
            </GridItem>
          </Grid>
        </Flex>
        <Flex flex={1} border="1px solid blue">
          <Flex
            flex={1}
            pt={89}
            pb={40}
            border="1px solid red"
            px={8}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex
              gap={24}
              flex={1}
              border="1px solid green"
              w="100%"
              justifyContent={"center"}
            >
              <Flex
                maxWidth={"500px"}
                maxHeight="500px"
                flex={1}
                bgRgbColor={"rgba(217, 217, 217, 1)"}
              ></Flex>
              <Flex
                flex={1}
                overflow={"hidden"}
                maxWidth={"500px"}
                maxHeight="500px"
                bgRgbColor={"rgba(217, 217, 217, 1)"}
              >
                {setting.video && <FrontCamera muted={setting.mic} />}
              </Flex>
            </Flex>
            <Flex mt={43} gap={24}>
              {buttons.map((button) => (
                <Button {...button} key={button.icon} />
              ))}
              <Button
                icon="button_exit"
                onClick={() => {
                  //
                }}
              />
            </Flex>
          </Flex>
          {setting.chat && (
            <Flex h="100%" w={288} bgColor={"Static/White"}></Flex>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

const Button = ({ icon, onClick }: ButtonProps) => {
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

type ButtonProps = {
  icon: IconNames;
  onClick: () => void;
};

export default InterviewScreen;
