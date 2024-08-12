import { GridItem } from "@chakra-ui/react";
import { FooterContainer, TopBarContainer } from "@components";
import { Button, Flex, GridWrapper, Text } from "@uis";
import Image from "next/image";

export default function Home() {
  return (
    <TopBarContainer>
      <FooterContainer>
        <Flex
          w="100%"
          py={318}
          bgColor={"Background/Normal/Alternative"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <GridWrapper>
            <GridItem colSpan={5} colStart={2} overflow={"visible"}>
              <Flex
                w="100%"
                flexDir={"column"}
                justifyContent={"center"}
                h="100%"
              >
                <Flex flexDir={"column"} w={"120%"}>
                  <Text type="Display1" fontWeight={"700"}>
                    면접 연습, 이제 AI와 함께
                  </Text>
                  <Text
                    mt={32}
                    type="Title1"
                    fontWeight={"700"}
                  >{`INTERVIEW+로 내게 딱 맞는 질문과\n정확한 피드백을 경험해보세요!`}</Text>
                </Flex>
                <Flex w="100%" justifyContent={"center"} mt={56}>
                  <Button
                    type="Solid_Primary"
                    size="Large"
                    title={"지금 바로 시작하기"}
                    href={"/sign-in"}
                  />
                </Flex>
              </Flex>
            </GridItem>
            <GridItem colStart={8} colSpan={5}>
              <img src={"/images/home_image1.png"} width={486} height={445} />
            </GridItem>
          </GridWrapper>
        </Flex>
        <Flex pt={62} pb={47} justifyContent={"center"}>
          <Image
            alt="home_description_2"
            src={"/images/home_image2.png"}
            width={1200}
            height={971}
            style={{ width: 1200, height: 971 }}
          />
        </Flex>
        <Flex
          pt={90}
          pb={50}
          w="100%"
          gap={120}
          alignItems={"center"}
          justifyContent={"center"}
          bgColor={"Background/Normal/Alternative"}
        >
          <Image
            alt="home_description_3"
            src={"/images/home_image3.png"}
            width={548}
            height={400}
            style={{ width: 548, height: 400 }}
          />
          <Image
            alt="home_description_4"
            src={"/images/home_image4.png"}
            width={384}
            height={360}
            style={{ width: 384, height: 360 }}
          />
        </Flex>
      </FooterContainer>
    </TopBarContainer>
  );
}
