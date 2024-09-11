"use client";
import { GridItem } from "@chakra-ui/react";

import { useUserOnlyContext } from "@contexts";
import { Button, Flex, GridWrapper, Text } from "@uis";
import Row from "./components/Row";

const Profile = () => {
  const { user } = useUserOnlyContext();
  const { name, email, defaultResume, remainInterview } = user;
  return (
    <Flex py={116} w={"100%"} flexDir={"column"}>
      <GridWrapper w="100%" pb={48}>
        <GridItem colStart={5} colSpan={2}>
          <Text type={"Title1"} fontWeight={"700"}>
            프로필
          </Text>
        </GridItem>
      </GridWrapper>
      <Row title={"이름"} body={name} />
      <Row title={"이메일"} body={email} />
      <Row title={"기본 이력서"} body={defaultResume} />
      <Row title={"응시 잔여 횟수"} body={`${remainInterview}회`} />
      <Flex direction={"column"} pt={40} alignItems={"center"}>
        <Text
          type={"Heading1"}
          color={"Label/Alternative"}
          fontWeight={"400"}
          pb={16}
          pt={40}
        >
          간단한 설문조사 후에 면접 연습 30회권을 받아가세요!
        </Text>
        <Button
          type={"Outlined_Primary"}
          size="Large"
          title={"설문조사 하기"}
          href={
            "https://docs.google.com/forms/d/e/1FAIpQLSfun86YZZUuyOjeQYUyrXO-yS1kNBPL2DXTKxyThzwQXXxgRg/viewform"
          }
        />
      </Flex>
    </Flex>
  );
};

export default Profile;
