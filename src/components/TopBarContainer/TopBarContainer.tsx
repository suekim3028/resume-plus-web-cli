
import Flex from "../Flex/Flex";

const TopBarContainer = () => {
  return (
    <Flex direction={"row"} w="100%" style={{ alignSelf: "flex-start" }}>
      <Flex direction={"row"}
        alignItems={"center"}
        w={"100%"}
        px={40}
        py={20}
        bgColor={"STATIC_WHITE"}
      >
        <Font.Title type={"24_semibold_single"} color={"BASIC_WHITE"} ml={10}>
          Resume+
        </Font.Title>
      </L.FlexRow>
    </L.FlexRow>
  );
};

export default TopBarContainer;
