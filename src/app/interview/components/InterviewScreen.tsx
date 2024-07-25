/* eslint-disable jsx-a11y/alt-text */
import { interviewApis } from "@apis";
import { Grid, GridItem } from "@chakra-ui/react";
import { Icon, IconNames } from "@components";
import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";
import { commonHooks } from "@web-core";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { RandomQuestion } from "../types";
import FrontCamera from "./FrontCamera";

const InterviewScreen = ({
  interviewInfo,
  questions,
}: {
  interviewInfo: InterviewTypes.InterviewInfo;
  questions: RandomQuestion[];
}) => {
  const { company, job, department } = interviewInfo;
  const window = commonHooks.useWindowSize({});

  const [setting, setSetting] = useState({
    mic: false,
    video: false,
    chat: false,
  });
  //   const client = new SpeechClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const CAM_SIZE = useMemo(() => {
    if (!window) return 0;

    const height = window.height - BOTTOM_BAR_HEIGHT - TOP_BAR_HEIGHT - CAM_MT;
    const width =
      (window.width * (setting.chat ? 0.75 : 1) - CAM_GAP - CAM_MX * 2) / 2;
    console.log({ height, width });
    return Math.min(height, width);
  }, [window?.height, window?.width, setting.chat]);

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

  const chatRef = useRef<ChatRef>(null);

  const submitAnswer = async (answer: string) => {
    if (!currentQuestion.current) return;
    interviewApis.answerQuestion({
      questionId: currentQuestion.current.id,
      answer,
      type: currentQuestion.current.type,
    });
    getNextQuestion();
  };

  const currentQuestion = useRef<RandomQuestion>();
  const remainQuestions = useRef(questions);

  const getNextQuestion = () => {
    chatRef.current?.disable();
    currentQuestion.current = remainQuestions.current.shift();
    setTimeout(() => {
      chatRef.current?.enable();
    }, 2000);
  };

  const answerWithInput = (answer: string) => {
    submitAnswer(answer);
    getNextQuestion();
  };

  useEffect(() => {
    getNextQuestion();
  }, []);

  return (
    <Flex
      // flex={1}
      position={"absolute"}
      left={0}
      right={0}
      top={0}
      bottom={0}
      direction="column"
      bgRgbColor={"rgba(131, 131, 132, 1)"}
      // overflow={"hidden"}
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
      <Flex flex={1}>
        <Flex
          flex={1}
          px={8}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex
            gap={CAM_GAP}
            flex={1}
            w="100%"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Flex
              width={CAM_SIZE}
              // flex={0}
              height={CAM_SIZE}
              bgRgbColor={"rgba(217, 217, 217, 1)"}
              borderRadius={12}
            ></Flex>
            <Flex
              overflow={"hidden"}
              // flex={0}
              height={CAM_SIZE}
              width={CAM_SIZE}
              bgRgbColor={"rgba(217, 217, 217, 1)"}
              borderRadius={12}
            >
              {setting.video && <FrontCamera muted={setting.mic} />}
            </Flex>
          </Flex>
          <Flex h={BOTTOM_BAR_HEIGHT} pt={43} gap={24}>
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
        {setting.chat && <Chat answerWithInput={answerWithInput} />}
      </Flex>
    </Flex>
  );
};

const BOTTOM_BAR_HEIGHT = 148;
const TOP_BAR_HEIGHT = 60;
const CAM_MT = 88;
const CAM_GAP = 24;
const CAM_MX = 8;
const ChatButton = (chat: { isMine: boolean; text: string }) => {};

type ChatRef = {
  addQuestion: (question: string) => void;
  appendAnswer: (answer: string) => void;
  disable: () => void;
  enable: () => void;
};
type ChatProps = {
  answerWithInput: (answer: string) => void;
};

const ChatComponent: ForwardRefRenderFunction<ChatRef, ChatProps> = (
  { answerWithInput },
  ref
) => {
  const [chats, setChats] = useState<{ isMine: boolean; text: string }[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);

  const addQuestion = (question: string) => {
    setChats((c) => [...c, { isMine: false, text: question }]);
  };

  const appendAnswer = (answer: string) => {
    if (!inputRef.current) return;
    inputRef.current.value = [inputRef.current.value, answer].join("");
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickSend = () => {
    if (!inputRef.current) return;
    answerWithInput(inputRef.current.value);
  };

  const disable = () => {
    if (inputRef.current) inputRef.current.value = "";
    setInputDisabled(true);
  };

  const enable = () => {
    setInputDisabled(false);
  };

  useImperativeHandle(ref, () => ({
    disable,
    enable,
    appendAnswer,
    addQuestion,
  }));

  return (
    <Flex
      h="100%"
      w="25%"
      bgColor={"Static/White"}
      direction={"column"}
      pb={24}
    >
      <Flex flex={1} w="100%" direction={"column"}></Flex>
      <Flex width="100%" px={16}>
        <Flex
          bgColor={"Primary/Normal"}
          w="100%"
          justifyContent={"space-between"}
          px={16}
          py={13}
        >
          <input
            ref={inputRef}
            disabled={inputDisabled}
            placeholder="답변을 입력하세요"
            color="white"
            style={{
              fontFamily: "Pretendard JP",
              fontSize: 15,
              lineHeight: "22.01px",

              border: "none",
              backgroundColor: "transparent",

              color: "white",
            }}
          />
          <Flex p={3} onClick={handleClickSend}>
            <Icon name="button_chat_off" size={16} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const Chat = forwardRef(ChatComponent);

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
