"use client";
import { userApis } from "@apis";
import { useGoogleLogin } from "@react-oauth/google";
import { TokenStorage } from "@storage";
import { userStore } from "@store";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";

export const useUser = () => {
  const setUser = useSetRecoilState(userStore);
  const loadableUser = useRecoilValueLoadable(userStore);

  const handleUser = ({ user, token }: userApis.UserResponse) => {
    setUser(user);
    TokenStorage.set(token);
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { token_type, access_token } = tokenResponse;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `${token_type} ${access_token}`);

        const data = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          }
        );
        const user = await data.json();
        const email = user?.email;
        const name = user?.name;

        if (!!email && !!name) {
          const { data, isError } = await userApis.googleSignIn({
            email,
            name,
            id_token: access_token,
          });

          if (isError) {
            throw new Error();
          }

          handleUser(data);
        } else {
          throw new Error();
        }
      } catch (e) {
        alert("로그인에서 오류가 발생했어요. 다시 시도해주세요.");
      }
    },
    onError: () => {
      alert("로그인에서 오류가 발생했어요. 다시 시도해주세요.");
    },
  });

  const loginWithEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data, isError } = await userApis.emailSignIn({
      email,
      password,
    });

    if (isError) {
      throw new Error();
    }

    handleUser(data);
  };

  return { loadableUser, loginWithGoogle, loginWithEmail };
};
