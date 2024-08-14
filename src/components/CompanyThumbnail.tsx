import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";

const CompanyThumbnail = ({
  thumbnailUrl,
  companyName,
  size,
}: Pick<InterviewTypes.Company, "thumbnailUrl" | "companyName"> & {
  size: number;
}) => {
  return (
    <Flex
      w={size}
      h={size}
      flexShrink={0}
      rounded={10}
      alignItems={"center"}
      justifyContent={"center"}
      bgRgbColor="black"
    >
      <Text type={"Label1_Normal"} color={"Static/White"}>
        {companyName}
      </Text>
    </Flex>
  );
};

export default CompanyThumbnail;
