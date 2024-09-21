"use client";
import { GridItem } from "@chakra-ui/react";
import { Flex, GridWrapper, Text } from "@uis";
import Link from "next/link";
import { EventLogger } from "./EventLogger";

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
              <Button
                title={"Service Guide"}
                url={
                  "https://alive-capacity-239.notion.site/cc48f3bb32d74e24b7f7c17df2230813?pvs=4"
                }
              />
              <Button
                title={"Privacy Policy"}
                url={
                  "https://alive-capacity-239.notion.site/04d05207f7174be182ed176039544fde?pvs=4"
                }
              />
              <Button
                title={"Survey"}
                url={
                  "https://docs.google.com/forms/d/e/1FAIpQLSfun86YZZUuyOjeQYUyrXO-yS1kNBPL2DXTKxyThzwQXXxgRg/viewform"
                }
              />
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

const Button = ({
  url,
  title,
}: {
  url: string;
  title: "Service Guide" | "Privacy Policy" | "Survey";
}) => {
  return (
    <Link
      href={url}
      target={"_blank"}
      style={{ textDecoration: "none" }}
      onClick={() => EventLogger.log("footer_button", title)}
    >
      <Text type={"Heading2"} fontWeight={"600"} color={"Static/White"}>
        {title}
      </Text>
    </Link>
  );
};

export default Footer;
