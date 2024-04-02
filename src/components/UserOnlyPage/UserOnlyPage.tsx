import { Indicator } from "@chakra-ui/react";
import { useUser } from "@hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const UserOnlyPage = ({ children }: React.PropsWithChildren) => {
  const { hasUser } = useUser();

  if (hasUser) {
    return children;
  }

  return <OnNotUser />;
};

const OnNotUser = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/sign-in");
  }, []);
  return <Indicator />;
};

export default UserOnlyPage;
