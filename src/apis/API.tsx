import { userApis } from "@apis";
import { TokenStorage } from "@storage";
import { Button, Flex, Text } from "@uis";
import { ModalManager, returnFetch } from "@web-core";

const API = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_API_SERVER,
  tokenHeaderFn: async () => {
    const token = TokenStorage.get();
    if (!token || !token?.accessToken || !token?.refreshToken) return null;
    return { Authorization: `Bearer ${token.accessToken}` };
  },
  onError: () => {
    console.log("!!!!");
    ModalManager.show({
      Component: (
        <Flex
          color="white"
          borderRadius={20}
          alignItems={"flex-end"}
          pl={32}
          pr={0}
          pb={16}
          pt={32}
          bgColor={"Static/White"}
          minWidth={200}
        >
          <Text
            pb={40}
            type={"Heading2"}
            fontWeight={"600"}
            color={"Static/Black"}
            textAlign={"center"}
          >
            {`오류가 발생했습니다.\n다시 시도해주세요.`}
          </Text>
          <Flex justifyContent={"flex-end"}>
            <Button
              title={"확인"}
              type={"Text_Primary"}
              onClick={() => ModalManager.close()}
              size="Large"
            />
          </Flex>
        </Flex>
      ),
      closeOnDim: false,
    });
  },
  onUnauthorizedError: async () => {
    try {
      const token = TokenStorage.get();
      if (!token) return;
      const refreshToken = token?.refreshToken;
      if (!refreshToken) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/user/login`,
        {
          body: JSON.stringify({
            loginType: "REFRESH",
            payload: {
              refreshToken,
            },
          }),
          method: "POST",
        }
      );

      if (res.ok) {
        const json = (await res.json()) as userApis.UserResponse;
        TokenStorage.set(json.token);
      } else {
        TokenStorage.remove();
      }
    } catch (e) {
      TokenStorage.remove();
    }
  },
});

export default API;
