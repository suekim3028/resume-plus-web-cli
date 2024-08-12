"use client";
import { GridItem } from "@chakra-ui/react";
import { Flex, GridWrapper, Text } from "@uis";
import Link from "next/link";

const Footer = () => {
  return (
    <Flex
      w="100%"
      justifyContent={"center"}
      bgColor={"Label/Neutral"}
      pt={40}
      pb={44}
    >
      <GridWrapper>
        <GridItem colSpan={12} colStart={1}>
          <Flex w="100%">
            <Flex direction={"column"}>
              <Text type={"Title1"} fontWeight={"700"} color={"Static/White"}>
                INTERVIEW+
              </Text>
              <Text type={"Title2"} colorRgb={"rgba(142, 142, 142, 1)"}>
                By Team 레플
              </Text>
            </Flex>
            <Flex gap={40} ml={94} mr={17}>
              <Button title={"Service Guide"} url={""} />
              <Button title={"Private Policy"} url={""} />
              <Button title={"Survey"} url={""} />
              <Flex flexDir={"column"}>
                <Text
                  type={"Heading2"}
                  fontWeight={"600"}
                  color={"Static/White"}
                >
                  Contact Us
                </Text>
                <Text
                  type={"Label1_Normal"}
                  fontWeight={"400"}
                  color={"Static/White"}
                >
                  {`카카오톡 @Interview+\nresumeplus365@gmail.com`}
                </Text>
              </Flex>
            </Flex>
            <Text
              type={"Caption1"}
              fontWeight={"600"}
              colorRgb={"rgba(142, 142, 142, 1)"}
            >
              {`© 2024. Team 레플. ALL RIGHTS RESERVED\nWanted Design Library를 사용했습니다.`}
            </Text>
          </Flex>
        </GridItem>
      </GridWrapper>
    </Flex>
  );
};

const Button = ({ url, title }: { url: string; title: string }) => {
  return (
    <Link href={url} target={"_blank"}>
      <Text
        type={"Heading2"}
        fontWeight={"600"}
        color={"Static/White"}
        cursor={"pointer"}
        onClick={() => {}} // TODO: 링크 연결
      >
        {title}
      </Text>
    </Link>
  );
};

export default Footer;
