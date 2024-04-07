import { Button, Flex } from "@chakra-ui/react";
import { InterviewTypes } from "@types";
import React, { useRef } from "react";

const ChatComponent = ({ chats, answer }: ChatProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAnswer = () => {
    if (!inputRef.current) return;
    const answerText = inputRef.current.value;
    if (!answerText) return;
    answer(answerText);
    inputRef.current.value = "";
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Flex direction={"column"} overflowY={"scroll"} h="100%" w={"100%"}>
        {chats.map(({ isMine, content }, idx) => {
          return (
            <Flex
              key={idx}
              alignSelf={isMine ? "flex-end" : "flex-start"}
              w={"60%"}
              p={"20px"}
              border={"1px solid black"}
              bgColor={"white"}
              mb={"10px"}
            >
              {content}
            </Flex>
          );
        })}
      </Flex>
      <Flex h={50} w={"100%"} bgColor={"gray"}>
        <input style={{ backgroundColor: "white" }} ref={inputRef} />
        <Button onClick={handleAnswer}>답변</Button>
      </Flex>
    </div>
  );
};

type ChatProps = {
  chats: InterviewTypes.Chat[];
  answer: (answer: string) => void;
};
export type ChatRef = {
  onAddAnswer: (answer: string) => void;
};

const Chat = React.forwardRef<ChatRef, ChatProps>(ChatComponent);

export default Chat;
