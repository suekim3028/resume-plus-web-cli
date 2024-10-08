import { Flex } from "@chakra-ui/react";
import { UI } from "@constants";
import { Text } from "@uis";

const InterviewDetailSetting = () => {
  return (
    <>
      <Text type="Heading2" fontWeight={"600"} mt={60}>
        면접 상세 설정
      </Text>
      <Text type="Headline2" color={"Accent/Red Orange"} fontWeight={"500"}>
        초기 설정 외 다른 기능은 사용할 수 없어요
      </Text>
      <Text type="Body2_Normal" fontWeight={"500"} mt={16} mb={24}>
        면접 상세 설정
      </Text>
      <TemporaryButtons
        list={[
          {
            label: "1차 면접",
            selected: true,
          },
          {
            label: "2차 면접",
            selected: false,
          },
          {
            label: "3차 면접",
            selected: false,
          },
          {
            label: "최종 면접",
            selected: false,
          },
        ]}
      />
      <Text type="Body2_Normal" fontWeight={"500"} my={24}>
        면접 대상을 선택해주세요
      </Text>
      <TemporaryButtons
        list={[
          {
            label: "AI 면접",
            selected: false,
          },
          {
            label: "실무진 면접",
            selected: true,
          },
          {
            label: "임원/대표 면접",
            selected: false,
          },
          {
            label: "HR 면접",
            selected: false,
          },
        ]}
      />
      <Flex w="100%" mt={24}>
        <Flex direction={"column"} flex={1}>
          <Text type="Body2_Normal" fontWeight={"500"}>
            면접 형태
          </Text>
          {/* <ListSelector<string> itemList={[{"label":""}]} /> */}
          <Flex
            px={8}
            py={10}
            borderBottom={"1px solid rgba(55, 56, 60, 0.16)"}
            w="100%"
          >
            <Text
              type="Body1_Normal"
              fontWeight={"400"}
              color={"Label/Disable"}
            >
              일반 면접
            </Text>
          </Flex>
        </Flex>
        <Flex w={24} />
        <Flex direction={"column"} flex={1}>
          <Text type="Body2_Normal" fontWeight={"500"}>
            면접 인원
          </Text>
          <Flex
            px={8}
            py={10}
            w="100%"
            borderBottom={"1px solid rgba(55, 56, 60, 0.16)"}
          >
            <Text
              type="Body1_Normal"
              fontWeight={"400"}
              color={"Label/Disable"}
            >
              일반 면접
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

const TemporaryButtons = ({
  list,
}: {
  list: { label: string; selected: boolean }[];
}) => {
  return (
    <Flex w="100%" gap={8} py={8} px={9.5}>
      {list.map(({ label, selected }) => {
        const color = selected ? "Primary/Normal" : "Label/Disable";
        return (
          <Flex
            key={label}
            flex={1}
            borderRadius={10}
            justifyContent={"center"}
            alignItems={"center"}
            py={12}
            border={`1px solid ${UI.COLORS[color]}`}
          >
            <Text type={"Body2_Normal"} color={color}>
              {label}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default InterviewDetailSetting;
