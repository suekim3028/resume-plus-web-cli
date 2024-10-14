import { InterviewTypes } from "@types";
import { Flex, Text } from "@uis";

const CompanyThumbnail = ({
  imageUrl,
  companyName: _companyName,
  size,
}: Pick<InterviewTypes.Company, "imageUrl" | "companyName"> & {
  size: "small" | "large";
}) => {
  const sizeN = size === "small" ? 48 : 128;
  const rounded = size === "small" ? 12 : 10;

  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        src={imageUrl}
        width={sizeN}
        height={sizeN}
        style={{
          width: sizeN,
          height: sizeN,
          borderRadius: rounded,
          objectFit: "contain",
          backgroundColor: "rgba(0,0,0,0.05)",
        }}
      />
    );
  }

  const companyName =
    _companyName.length > 8 ? `${_companyName.slice(0, 7)}...` : _companyName;

  return (
    <Flex
      w={sizeN}
      h={sizeN}
      py={size === "small" ? 8 : 16}
      px={size === "small" ? 2 : 0}
      rounded={rounded}
      alignItems={"center"}
      justifyContent={"center"}
      bgColor={"Fill/Strong"}
    >
      <Text
        type={size === "small" ? "Caption1" : "Title1"}
        fontWeight={size === "small" ? "400" : "500"}
        color={"Static/Black"}
      >
        {companyName}
      </Text>
    </Flex>
  );
};

export default CompanyThumbnail;
