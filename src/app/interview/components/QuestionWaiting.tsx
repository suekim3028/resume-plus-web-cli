import { GridItem } from "@chakra-ui/react";
import { Flex, GridWrapper, Text } from "@uis";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import S from "./styles.module.css";

const QuestionWaitingComponent: ForwardRefRenderFunction<QuestionWaitingRef> = (
  _,
  ref
) => {
  const [animState, setAnimState] = useState<"DEFAULT" | "WAITING" | "END">(
    "DEFAULT"
  );

  const divRef = useRef<HTMLDivElement>(null);
  console.log(animState);

  const animStart = () =>
    new Promise((resolve: (val: undefined) => void) => {
      // divRef.current && divRef.current.style  = "none";
      setAnimState("END");
      setTimeout(() => {
        resolve(undefined);
      }, 1500);
    });
  useImperativeHandle(ref, () => ({
    animStart,
  }));

  useEffect(() => {
    setAnimState("WAITING");
  }, []);

  return (
    <GridWrapper h="100dvh">
      <GridItem
        colSpan={6}
        colStart={4}
        display={"flex"}
        flex={1}
        alignItems={"center"}
      >
        <Flex direction={"column"} alignItems={"center"}>
          <Text type="Title3" fontWeight={"500"} color={"Static/Black"} mb={24}>
            {"장준혁"}님의 정보를 바탕으로 맞춤형 질문을 만들고 있어요!
          </Text>
          <Flex
            w="100%"
            bgColor={"Background/Elevated/Alternative"}
            h={16}
            overflow={"hidden"}
            borderRadius={10000}
            position={"relative"}
          >
            <Flex
              ref={divRef}
              w="100%"
              bgColor={"Primary/Normal"}
              h={16}
              borderRadius={10000}
              position={"absolute"}
              left={"-100%"}
              top={0}
              className={
                animState === "DEFAULT" ? undefined : S["question-waiting-bar"]
              }
            />

            <Flex
              ref={divRef}
              w="100%"
              bgColor={"Primary/Normal"}
              h={16}
              borderRadius={10000}
              position={"absolute"}
              left={"-100%"}
              top={0}
              className={
                animState === "END" ? S["question-end-bar"] : undefined
              }
            />
          </Flex>
        </Flex>
      </GridItem>
    </GridWrapper>
  );
};

const QuestionWaiting = forwardRef(QuestionWaitingComponent);
export type QuestionWaitingRef = {
  animStart: () => Promise<void>;
};
export default QuestionWaiting;
