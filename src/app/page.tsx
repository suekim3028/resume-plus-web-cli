import { GridItem } from "@chakra-ui/react";
import { TopBarContainer } from "@components";
import { Button, Flex, GridWrapper, Text } from "@uis";

export default function Home() {
  return (
    <TopBarContainer>
      <Flex
        w="100%"
        py={200}
        bgColor={"Background/Normal/Alternative"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <GridWrapper>
          <GridItem colSpan={5}>
            <Flex flexDir={"column"} w="100%" alignItems={"center"}>
              <Flex>
                <Text type="Display2">카피 예정</Text>
              </Flex>
              <Button
                flexProps={{ mt: 20 }}
                type="Solid_Primary"
                size="Large"
                title={"면접 연습하러 가기"}
                href={"/sign-in"}
              />
            </Flex>
          </GridItem>
          <GridItem colSpan={7}>
            <Flex
              flexDir={"column"}
              w="100%"
              h={200}
              bgColor="Line/Solid/Normal"
            >
              <Flex bgColor={"Accent/Pink"} w={200} h={200}></Flex>
            </Flex>
          </GridItem>
        </GridWrapper>
      </Flex>
    </TopBarContainer>
  );
}
