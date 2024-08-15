import { Flex, Text } from "@uis";

const AuthLoadingComponent = () => {
  return (
    <Flex flex={1} h={200} alignItems={"center"}>
      <Text type={"Body2_Normal"}>유저 정보 확인중 ...</Text>
    </Flex>
  );
};

export default AuthLoadingComponent;
