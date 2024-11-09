import { Button, Flex, Text } from "@uis";

const IdleStatus = ({ goNext }: { goNext: () => void }) => {
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      h={580}
      justifyContent={"center"}
    >
      <Text type="Title3" color="Static/Black" fontWeight={"500"} mb={64}>
        원활한 면접을 위해 웹캠과 마이크 환경을 점검할게요
      </Text>
      <Button
        type="Solid_Primary"
        title="다음"
        onClick={goNext}
        size="Large"
        flexProps={{ width: 228 }}
      />
    </Flex>
  );
};

export default IdleStatus;
