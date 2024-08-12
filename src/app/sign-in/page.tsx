"use client";
import { GridItem } from "@chakra-ui/react";
import { Logo } from "@components";
import { useUser } from "@hooks";
import { Button, Flex, GridWrapper, Text, TextButton } from "@uis";

const SignInComponent = () => {
  const { loginWithGoogle } = useUser();

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
          <Logo size={"LARGE"} />
          <Text mt={40} type="Heading1" fontWeight={"500"} color="Label/Normal">
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
            flexProps={{ mt: 64 }}
            type="Outlined_Primary"
            size="Large"
            title="구글 계정으로 로그인"
            leftIcon="logoGoogle"
            stretch
            onClick={loginWithGoogle}
            textProps={{
              color: "Static/Black",
              fontSize: 22,
              fontWeight: "500",
              lineHeight: "30.01px",
            }}
          />
          <Button
            flexProps={{ mt: 40 }}
            type="Outlined_Primary"
            size="Large"
            title="아이디로 로그인"
            stretch
            href="/sign-in/email"
            textProps={{
              color: "Static/Black",
              fontSize: 22,
              fontWeight: "500",
              lineHeight: "30.01px",
            }}
          />
          <Text
            color="Label/Alternative"
            type="Body1_Normal"
            fontWeight={"500"}
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

const SignIn = () => {
  const onError = () => {
    // google login 에러일 가능성
    alert("로그인에서 오류가 발생했어요. 다시 시도해주세요.");
  };

  return <SignInComponent />;
};

export default SignIn;
