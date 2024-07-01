import { GridItem } from "@chakra-ui/react";
import { Logo } from "@components";
import { Button, Flex, GridWrapper, Text, TextButton } from "@ui";

const SignIn = () => {
  return (
    <Flex flex={1} alignItems={"center"}>
      <GridWrapper>
        <GridItem
          colSpan={6}
          colStart={4}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
        >
          <Logo />
          <Text mt={32} type="Heading1" fontWeight={"500"} color="Label/Normal">
            나만의 AI 면접관으로 맞춤형 면접을 받아보세요
          </Text>
        </GridItem>
        <GridItem
          colSpan={4}
          colStart={5}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
        >
          <Button
            mt={64}
            type="Outlined_Primary"
            size="Large"
            title="구글 계정으로 로그인"
            leftIcon="logoGoogle"
            stretch
          />
          <Button
            mt={40}
            type="Outlined_Primary"
            size="Large"
            title="아이디로 로그인"
            stretch
          />
          <Text
            color="Label/Alternative"
            type="Body1_Normal"
            fontWeight={"600"}
            mt={53}
          >
            로그인에 어려움을 겪으시나요?
          </Text>
          <TextButton
            mt={8}
            type="Assistive"
            title="고객센터 문의하기"
            href=""
            size="Medium"
          />
        </GridItem>
      </GridWrapper>
    </Flex>
  );
};

export default SignIn;
