import { Font, Layout as L } from "@design-system";
import * as S from "./styles";
import { useUser } from "@hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import { UserType } from "@types";

const Index = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const { signUp } = useUser();
  const router = useRouter();

  const signUpUser = useRef<UserType.SignUpUser>({
    username: "",
    password: "",
    email: "",
    name: "",
  });

  const checkValidSignUpUser = () =>
    Object.values(signUpUser.current).every(Boolean);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: keyof UserType.SignUpUser
  ) => {
    signUpUser.current = {
      ...signUpUser.current,
      [type]: e.target.value,
    };

    setCanSubmit(checkValidSignUpUser());
  };

  const submit = async () => {
    if (!checkValidSignUpUser()) return;
    await signUp(signUpUser.current);
  };

  return (
    <L.FlexCol h={"100%"} w={"100%"} justifyContent="space-between">
      <L.FlexCol flex={1} w="100%" justifyContent="center" alignItems="center">
        <L.FlexCol p={40} w={400}>
          <Font.Title type={"20_bold_single"} color={"PRIMARY_400"} mb={20}>
            Sign Up
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
                placeholder="email"
                onChange={(e) => handleChange(e, "email")}
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
                placeholder="name"
                onChange={(e) => handleChange(e, "name")}
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
                placeholder="Password"
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
                Register
              </Font.Title>
            </L.LayoutBase>
          </L.FlexCol>
        </L.FlexCol>
      </L.FlexCol>
    </L.FlexCol>
  );
};

export default Index;
