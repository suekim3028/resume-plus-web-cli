"use client";
import { EventLogger, Logo } from "@components";
import { UI } from "@constants";
import { useAuth } from "@hooks";

import { Button, Flex, Text, TextButton } from "@uis";

const SignInComponent = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <Flex flex={1} alignItems={"center"}>
      <Flex flexDir={"column"} alignItems={"center"} overflow={"visible"}>
        <Logo size={"LARGE"} />
        <Text mt={44} type="Heading1" fontWeight={"500"} color="Label/Normal">
          나만의 AI 면접관으로 맞춤형 면접을 받아보세요
        </Text>
        <Flex flexDir={"column"} w={384}>
          <Button
            flexProps={{
              mt: 64,
              height: 64,
              padding: 0,
              borderColor: UI.COLORS["Line/Normal/Strong"],
              borderWidth: 2,
              gap: 16,
            }}
            iconSize={24}
            type="Outlined_Primary"
            size="Large"
            title="구글 계정으로 로그인"
            leftIcon="logoGoogle"
            stretch
            onClick={() => {
              signInWithGoogle();
              EventLogger.log("login_button", "구글 계정으로 로그인");
            }}
            textProps={{
              color: "Static/Black",
              fontSize: 22,
              fontWeight: "500",
              lineHeight: "30.01px",
            }}
          />
          <Button
            flexProps={{
              mt: 40,
              height: 64,
              padding: 0,
              borderColor: UI.COLORS["Line/Normal/Strong"],
              borderWidth: 2,
            }}
            type="Outlined_Primary"
            size="Large"
            title="이메일로 로그인"
            stretch
            href="/sign-in/email"
            onClick={() => {
              EventLogger.log("login_button", "이메일로 로그인");
            }}
            textProps={{
              color: "Static/Black",
              fontSize: 22,
              fontWeight: "500",
              lineHeight: "30.01px",
            }}
          />
        </Flex>
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
          onClick={() => {
            EventLogger.log("login_button", "고객센터 문의하기");
          }}
          href="https://pf.kakao.com/_neapG/chat"
          size="Medium"
        />
      </Flex>
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
