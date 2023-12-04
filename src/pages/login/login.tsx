import { Font, Layout as L } from "@design-system";
import TopBar from "src/components/TopBar/TopBar";
import * as S from "./login.styles";
import { ChangeEvent, ChangeEventHandler, useRef, useState } from "react";
import { userApis } from "@apis";
import { useRouter } from "next/router";
import { withErrorHandling } from "@utils";
const Login = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const router = useRouter();

  const idRef = useRef("");
  const pwRef = useRef("");

  const updateCanSubmit = () =>
    setCanSubmit(!!idRef.current && !!pwRef.current);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    type: "ID" | "PW"
  ) => {
    type === "ID"
      ? (idRef.current = e.target.value)
      : (pwRef.current = e.target.value);
    updateCanSubmit();
  };

  const submit = async () => {
    if (!canSubmit) return;

    const { isError } = await withErrorHandling(() =>
      userApis.signIn({
        username: idRef.current,
        password: pwRef.current,
      })
    );
    if (isError) return;
    router.replace("/main");
  };

  return (
    <L.FlexCol h={"100%"} w={"100%"} justifyContent="space-between">
      <TopBar />
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
                onChange={(e) => handleChange(e, "ID")}
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
                onChange={(e) => handleChange(e, "PW")}
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
          </L.FlexCol>
        </L.FlexCol>
      </L.FlexCol>
    </L.FlexCol>
  );
};

export default Login;
