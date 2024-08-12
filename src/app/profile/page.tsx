"use client";
import { GridItem } from "@chakra-ui/react";
import { TopBarContainer } from "@components";
import { userStore } from "@store";
import { Button, Flex, GridWrapper, Text } from "@uis";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useRecoilValue } from "recoil";

const ProfileComponent = () => {
  const user = useRecoilValue(userStore);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [!!user]);

  if (!user) return <></>;

  const { name, email, defaultResume, remainInterview } = user;
  return (
    <TopBarContainer>
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
            href={""} // TODO: 링크 연결
          />
        </Flex>
      </Flex>
    </TopBarContainer>
  );
};

const Row = ({ title, body }: { title: string; body: string }) => {
  return (
    <GridWrapper w="100%" pb={24}>
      <GridItem colStart={5} colSpan={2}>
        <Text type={"Title2"} color={"Primary/Normal"} fontWeight={"700"}>
          {title}
        </Text>
      </GridItem>
      <GridItem colStart={7} colSpan={5}>
        <Text type={"Title2"} color={"Label/Alternative"} fontWeight={"500"}>
          {body}
        </Text>
      </GridItem>
    </GridWrapper>
  );
};

const Profile = () => {
  return (
    <Suspense fallback={<>...</>}>
      <ProfileComponent />
    </Suspense>
  );
};

export default Profile;
