import { Icon } from "@components";
import { Flex, Text } from "@uis";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useInterviewContext } from "../InterviewContext";
import { Chat } from "../types";
import S from "./styles.module.css";

const ChatComponent: ForwardRefRenderFunction<ChatRef, ChatProps> = (
  { answerWithInput },
  ref
) => {
  const { chats } = useInterviewContext();
  const [inputDisabled, setInputDisabled] = useState(false);

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
  }));

  return (
    <Flex
      h="100%"
      w="25%"
      bgColor={"Background/Elevated/Alternative"}
      direction={"column"}
      pb={24}
    >
      <Flex
        flex={1}
        gap={16}
        py={16}
        w="100%"
        direction={"column"}
        justifyContent={"flex-end"}
        overflowY={"scroll"}
      >
        {chats.map((chat) => (
          <ChatBubble {...chat} key={chat.text.slice(0, 20)} />
        ))}
      </Flex>
      <Flex width="100%" px={16}>
        <Flex
          bgColor={"Primary/Normal"}
          w="100%"
          justifyContent={"space-between"}
          px={16}
          py={13}
          borderRadius={12}
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
            className={S["chat-input"]}
          />
          <Flex p={3} onClick={handleClickSend}>
            <Icon name="button_chat_off" size={16} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export type ChatRef = {
  appendAnswer: (answer: string) => void;
  disable: () => void;
  enable: () => void;
};
type ChatProps = {
  answerWithInput: (answer: string) => void;
};

export default forwardRef(ChatComponent);

const ChatBubble = ({ isMine, text }: Chat) => {
  return (
    <Flex w="100%" pl={isMine ? 32 : 16} pr={isMine ? 16 : 32}>
      <Flex
        flex={1}
        py={7}
        px={14}
        boxShadow={"0px 1px 2px 0px rgba(0, 0, 0, 0.12)"}
        bgColor={isMine ? "Primary/Normal" : "Static/White"}
        borderRadius={6}
      >
        <Text
          type="Body2_Reading"
          fontWeight={"400"}
          color={isMine ? "Static/White" : "Static/Black"}
        >
          {text}
        </Text>
      </Flex>
    </Flex>
  );
};
