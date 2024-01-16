import { Font, Layout as L } from "@design-system";
import * as S from "./Login.styles";

import { useUser } from "@hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import { UserType } from "@types";

const Login = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const { signIn } = useUser();
  const router = useRouter();

  const signInUser = useRef<UserType.SignInUser>({
    username: "",
    password: "",
  });

  const checkValidSignInUser = () =>
    Object.values(signInUser.current).every(Boolean);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: keyof UserType.SignInUser
  ) => {
    signInUser.current = {
      ...signInUser.current,
      [type]: e.target.value,
    };

    setCanSubmit(checkValidSignInUser());
  };

  const submit = async () => {
    if (!checkValidSignInUser()) return;
    await signIn(signInUser.current);
  };
  return (
    <L.FlexCol h={"100%"} w={"100%"} justifyContent="space-between">
      <L.FlexCol flex={1} w="100%" justifyContent="center" alignItems="center">
        <L.FlexCol p={40} bgColor={"GRAY_100"} w={400} rounded={20}>
          <Font.Title type={"20_bold_single"} color={"PRIMARY_400"} mb={20}>
            Welcome!
          </Font.Title>

          <L.FlexCol flex={1} w={"100%"} alignItems="center">
            <L.LayoutBase
              bgColor="BASIC_WHITE"
              outline="GRAY_500"
              ph={20}
              pv={12}
              flex={1}
              rounded={30}
              w={"100%"}
              mt={10}
            >
              <S.Input
                aria-multiline={false}
                placeholder="username"
                onChange={(e) => handleChange(e, "username")}
              />
            </L.LayoutBase>
            <L.LayoutBase
              bgColor="BASIC_WHITE"
              outline="GRAY_500"
              ph={20}
              pv={12}
              flex={1}
              rounded={30}
              w={"100%"}
              mt={10}
            >
              <S.Input
                aria-multiline={false}
                placeholder="assword"
                onChange={(e) => handleChange(e, "password")}
                type={"password"}
              />
            </L.LayoutBase>
            <L.LayoutBase
              bgColor={canSubmit ? "PRIMARY_400" : "PRIMARY_100"}
              pv={10}
              ph={40}
              rounded={40}
              mt={30}
              onClick={submit}
            >
              <Font.Title type={"20_bold_single"} color={"BASIC_WHITE"}>
                Login
              </Font.Title>
            </L.LayoutBase>

            <L.FlexRow mt={12} alignItems="center">
              <Font.Body type={"14_medium_single"} color={"GRAY_700"}>
                New Here?
              </Font.Body>
              <Link href={"/sign-up"}>
                <Font.Body
                  underline
                  type={"14_semibold_single"}
                  color={"PRIMARY_300"}
                  ml={8}
                >
                  Create an account
                </Font.Body>
              </Link>
            </L.FlexRow>
          </L.FlexCol>
        </L.FlexCol>
      </L.FlexCol>
    </L.FlexCol>
  );
};

export default Login;
