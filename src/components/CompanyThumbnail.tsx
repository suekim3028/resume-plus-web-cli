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
      bgRgbColor="rgba(217, 217, 217, 1)"
    >
      <Text type={"Label1_Normal"}>{companyName}</Text>
    </Flex>
  );
};

export default CompanyThumbnail;
