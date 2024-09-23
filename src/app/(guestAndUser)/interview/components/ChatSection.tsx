import { EventLogger, Icon } from "@components";
import { Flex, Text } from "@uis";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useInterviewContext } from "../InterviewContext";
import { Chat } from "../types";
import S from "./styles.module.css";

const ChatComponent = () => {
  const { chats, submitAnswerWithText, chatScrollRef } = useInterviewContext();

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const isSubmitting = useRef(false);
  const heightCalculatorRef = useRef<{
    setText: (text: string) => void;
  }>(null);

  const handleClickSend = useCallback(async () => {
    if (!inputRef.current || isSubmitting.current) return;
    isSubmitting.current = true;

    const value = inputRef.current.value;
    if (!value) {
      isSubmitting.current = false;
      return;
    }
    inputRef.current.value = "";

    submitAnswerWithText(value);

    isSubmitting.current = false;
  }, []);

  const [scrollHeight, setScrollHeight] = useState(
    inputRef.current?.scrollHeight || 0
  );
  console.log({ scrollHeight });
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
          {chats.map((chat, idx) => (
            <ChatBubble {...chat} key={idx} />
          ))}
        </Flex>
      </Flex>
      <Flex width="100%" px={16} justifySelf={"flex-end"}>
        <Flex
          height={"fit-content"}
          bgColor={"Primary/Normal"}
          w="100%"
          justifyContent={"space-between"}
          px={16}
          py={13}
          borderRadius={12}
        >
          <Flex w="100%" position={"relative"}>
            <HeightCalculator
              ref={heightCalculatorRef}
              onChangeHeight={setScrollHeight}
            />
            <textarea
              ref={inputRef}
              // wrap="soft"
              placeholder="답변을 입력하세요"
              color="white"
              onChange={(e) => {
                heightCalculatorRef.current?.setText(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleClickSend();

                  heightCalculatorRef.current?.setText("");

                  e.preventDefault();
                }
              }}
              style={{
                height: scrollHeight || undefined,
                zIndex: 3,
                overflowY: "hidden",
                width: "100%",
                fontFamily: "Pretendard JP Variable",
                fontSize: 15,
                lineHeight: "24px",
                border: "none",
                backgroundColor: "transparent",
                color: "white",
              }}
              className={S["chat-input"]}
            />
          </Flex>
          <Flex
            p={3}
            onClick={() => {
              EventLogger.log(
                "interview_chat_send_button",
                inputRef.current?.value || ""
              );
              handleClickSend();
            }}
            ml={16}
          >
            <Icon name="normalSendSharp" size={16} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatComponent;

const HeightCalculatorComponent: ForwardRefRenderFunction<
  { setText: (text: string) => void },
  { onChangeHeight: (height: number) => void }
> = ({ onChangeHeight }, ref) => {
  const [text, setText] = useState("");
  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    const height = entries[0].contentRect.height;
    onChangeHeight(height);
  }, []);
  const resizeObserver = new ResizeObserver(handleResize);

  useImperativeHandle(ref, () => ({ setText }));

  return (
    <Flex
      position={"absolute"}
      border={"1px solid white"}
      left={0}
      right={0}
      opacity={0}
      minHeight={22}
      ref={(ref) => {
        if (ref) resizeObserver.observe(ref);
      }}
    >
      <Text
        onResize={(e) => console.log(e)}
        type={"Body2_Reading"}
        fontWeight={"400"}
        w="100%"
        // opacity={0}
        color={"Accent/Red Orange"}
        border="1px solid orange"
      >
        {text}
      </Text>
    </Flex>
  );
};

const HeightCalculator = forwardRef<
  { setText: (text: string) => void },
  { onChangeHeight: (height: number) => void }
>(HeightCalculatorComponent);

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
