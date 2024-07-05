"use client";
import { GridItem } from "@chakra-ui/react";
import { Logo, TextInput } from "@components";
import { Button, Flex, GridWrapper, Text, TextButton } from "@uis";
import { useRef, useState } from "react";

const EmailSignIn = () => {
  const [canSubmit, setCanSubmit] = useState(false);

  const inputValue = useRef({
    email: "",
    password: "",
  });

  const checkSubmitPossible = () => {
    setCanSubmit(!!inputValue.current.email && !!inputValue.current.password);
  };

  const handleChangeEmail = ({ text: email }: { text: string }) => {
    inputValue.current = { ...inputValue.current, email };
    checkSubmitPossible();
  };

  const handleChangePassword = ({ text: password }: { text: string }) => {
    inputValue.current = { ...inputValue.current, password };
    checkSubmitPossible();
  };

  return (
    <Flex flex={1} alignItems={"center"} justifyContent={"center"}>
      <GridWrapper>
        <GridItem
          colSpan={4}
          colStart={5}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Logo />
          <TextInput
            title="아이디"
            placeholder="아이디를 입력해주세요"
            mt={56}
            onStateChange={handleChangeEmail}
          />
          <TextInput
            mt={24}
            title="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            hidden
            onStateChange={handleChangePassword}
          />
          <Button
            type={"Solid_Primary"}
            size={"Large"}
            title={"로그인"}
            stretch
            flexProps={{ mt: 32 }}
            disabled={!canSubmit}
          />
          <TextButton
            type={"Assistive"}
            title="아이디/비밀번호 찾기"
            size={"Medium"}
            mt={32}
          />

          <Flex w="100%" h={1} bgColor={"Line/Normal/Normal"} my={32} />
          <Flex alignItems={"center"}>
            <Text
              type="Body1_Normal"
              fontWeight={"500"}
              color="Label/Alternative"
              mr={15}
            >
              Interview+가 처음이라면?
            </Text>
            <TextButton type={"Assistive"} title="회원가입" size={"Medium"} />
          </Flex>
        </GridItem>
      </GridWrapper>
    </Flex>
  );
};

export default EmailSignIn;
