import { ApiTypes } from "@types";
import API from "./API";

type SignInParams = {
  username: string;
  password: string;
};

type SignInResponse = {
  access_token: string;
};

export const signIn = async (params: SignInParams) => {
  const { access_token } = await API.post<SignInResponse>(
    `/auth/token`,
    params
  );
  API.setHeaderToken(access_token);
};

type SignUpParams = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export const signUp = (data: SignUpParams) =>
  API.post<ApiTypes.SuccessRes>("/auth", data);
