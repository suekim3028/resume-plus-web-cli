"use client";
import { GridItem } from "@chakra-ui/react";
import { EventLogger } from "@components/EventLogger";
import Footer from "@components/Footer";
import { useUser } from "@hooks";
import { userStore } from "@store";
import { Flex, GridWrapper, Text } from "@uis";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ForwardRefRenderFunction,
  ReactNode,
  Suspense,
  forwardRef,
  useState,
} from "react";
import { useRecoilValue } from "recoil";
import Icon from "../Icon/Icon";
import Logo from "../Logo/Logo";

const TopBarContainerComponent: ForwardRefRenderFunction<
  HTMLDivElement,
  { children: ReactNode; footer?: boolean }
> = ({ children, footer }, ref) => {
  const router = useRouter();
  return (
    <Flex
      w="100%"
      position={"fixed"}
      left={0}
      right={0}
      top={0}
      bottom={0}
      direction={"column"}
      alignItems={"center"}
      ref={ref}
    >
      <Flex
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        borderBottom={"1px solid rgba(225, 226, 228, 1)"}
      >
        <GridWrapper h={60}>
          <GridItem
            colSpan={2}
            alignItems={"center"}
            display={"flex"}
            onClick={() => {
              router.push("/");
              EventLogger.log("global_navigation_bar_button")("logo");
            }}
            cursor={"pointer"}
          >
            <Logo />
          </GridItem>

          <Suspense fallback={<></>}>
            <UserButtonList />
          </Suspense>
        </GridWrapper>
      </Flex>
      <Flex
        flex={1}
        overflowY={"scroll"}
        w="100%"
        flexDir={"column"}
        justifyContent={"space-between"}
      >
        <Flex w="100%" flexDir={"column"}>
          {children}
        </Flex>
        {footer && <Footer />}
      </Flex>
    </Flex>
  );
};

const TopBarContainer = forwardRef<
  HTMLDivElement,
  { children: ReactNode; footer?: boolean }
>(TopBarContainerComponent);

const UserButtonList = () => {
  const user = useRecoilValue(userStore);
  const { logout } = useUser();
  const router = useRouter();
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  return (
    <>
      <Button name={"서비스 안내"} href={"/"} colStart={9} />
      <Button
        name={"면접 연습"}
        href={user ? "/interview-setting" : "/sign-in"}
        colStart={10}
      />
      <Button
        name={"면접 결과"}
        href={user ? "/result" : "/sign-in"}
        colStart={11}
      />

      {user ? (
        <GridItem
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          colStart={12}
        >
          <Flex position={"relative"}>
            <Icon
              name={"navigationMypage_LabelStrong"}
              size={24}
              onClick={() => setUserMenuVisible((p) => !p)}
            />
            {userMenuVisible && (
              <Flex
                flexDirection={"column"}
                borderRadius={8}
                border={"1px solid black"}
                position={"absolute"}
                top={"100%"}
                right={0}
                bgColor={"Static/White"}
                whiteSpace={"nowrap"}
                width={78}
              >
                <Flex
                  py={10}
                  w="100%"
                  justifyContent={"center"}
                  cursor={"pointer"}
                  onClick={() => {
                    router.push("/profile");
                    EventLogger.log("global_navigation_bar_profile")("프로필");
                  }}
                >
                  <Text type="Label1_Normal" fontWeight={"500"}>
                    프로필
                  </Text>
                </Flex>
                <Flex h={1} w={"100%"} bgColor={"Line/Normal/Strong"} />
                <Flex
                  py={10}
                  cursor={"pointer"}
                  justifyContent={"center"}
                  w="100%"
                  onClick={() => {
                    logout();
                    EventLogger.log("global_navigation_bar_profile")(
                      "로그아웃"
                    );
                  }}
                >
                  <Text type="Label1_Normal" fontWeight={"500"}>
                    로그아웃
                  </Text>
                </Flex>
              </Flex>
            )}
          </Flex>
        </GridItem>
      ) : (
        <Button
          name={"로그인"}
          href={user ? "/interview" : "/sign-in"}
          colStart={12}
        />
      )}
    </>
  );
};

const Button = ({
  name,
  href,
  colStart,
}: {
  name: "서비스 안내" | "면접 연습" | "면접 결과" | "로그인";
  href: string;
  colStart: number;
}) => {
  return (
    <>
      <GridItem
        key={name}
        colStart={colStart}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Link
          href={href}
          style={{ textDecoration: "none", color: "black" }}
          onClick={() => {
            EventLogger.log("global_navigation_bar_button")(name);
          }}
        >
          <Text type={"Body2_Normal"}>{name}</Text>
        </Link>
      </GridItem>
    </>
  );
};

export default TopBarContainer;
