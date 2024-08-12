import { Text } from "@uis";

const Logo = ({ size }: { size: "LARGE" | "MEDIUM" | "SMALL" }) => (
  <Text
    type={
      size === "SMALL" ? "Title2" : size === "MEDIUM" ? "Title1" : "Display1"
    }
    fontWeight={"700"}
    userSelect={"none"}
  >
    INTERVIEW+
  </Text>
);

export default Logo;
