import { Text } from "@uis";
import Link from "next/link";

const LogoComponent = ({ size }: { size: "LARGE" | "MEDIUM" | "SMALL" }) => (
  <Text
    type={
      size === "SMALL" ? "Title2" : size === "MEDIUM" ? "Title1" : "Display1"
    }
    fontWeight={"700"}
    userSelect={"none"}
    color={"Static/Black"}
  >
    INTERVIEW+
  </Text>
);

const Logo = ({
  size,
  useLink,
}: {
  size: "LARGE" | "MEDIUM" | "SMALL";
  useLink?: boolean;
}) =>
  useLink ? (
    <Link style={{ textDecoration: "none" }} href={"/"}>
      <LogoComponent size={size} />
    </Link>
  ) : (
    <LogoComponent size={size} />
  );

export default Logo;
