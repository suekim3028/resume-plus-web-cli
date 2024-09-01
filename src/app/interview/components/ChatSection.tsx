import { Icon } from "@components";
import { Flex, Text } from "@uis";
import { useRef } from "react";
import { useInterviewContext } from "../InterviewContext";
import { Chat } from "../types";
import S from "./styles.module.css";

const ChatComponent = () => {
  const { chats, submitAnswerWithText, chatScrollRef } = useInterviewContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickSend = () => {
    if (!inputRef.current) return;
    submitAnswerWithText(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <Flex
      h="100%"
      w="25%"
      bgColor={"Background/Elevated/Alternative"}
      direction={"column"}
      pb={24}
      justifyContent={"flex-end"}
    >
      <Flex
        flexGrow={0}
        flexShrink={1}
        w="100%"
        overflowY={"scroll"}
        direction={"column"}
        ref={chatScrollRef}
      >
        <Flex
          gap={16}
          py={16}
          w="100%"
          direction={"column"}
          justifyContent={"flex-end"}
        >
          {chats.map((chat) => (
            <ChatBubble {...chat} key={chat.text.slice(0, 20)} />
          ))}
        </Flex>
      </Flex>
      <Flex width="100%" px={16} justifySelf={"flex-end"} flex={0}>
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
            <Icon name="normalSendSharp" size={16} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatComponent;

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
