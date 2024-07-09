"use client";
import { userApis } from "@apis";
import { TokenStorage } from "@storage";
import { userStore } from "@store";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

export const useUser = () => {
  const [user, setUser] = useRecoilState(userStore);
  const loadableUser = useRecoilValueLoadable(userStore);

  const handleUser = ({ user, token }: userApis.UserResponse) => {
    setUser(user);
    TokenStorage.set(token);
  };

  return { user, handleUser, loadableUser };
};
