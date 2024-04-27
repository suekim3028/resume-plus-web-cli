import { ApiTypes, UserTypes } from "@types";
import API from "./API";

export type SignInResponse = {
  user: UserTypes.User;
  token: {
    grantType: string;
    accessToken: string;
    refreshToken: string;
  };
};

export const signIn = async (params: UserTypes.SignInUser) =>
  API.post<SignInResponse>(`/users/login`, params);

export const signUp = (data: UserTypes.SignUpUser) =>
  API.post<SignInResponse>("/users/signup", data);
