import { ApiTypes, UserType } from "@types";
import API from "./API";

type SignInResponse = {
  access_token: string;
};

export const signIn = async (params: UserType.SignInUser) => {
  const { access_token } = await API.post<SignInResponse>(
    `/auth/login`,
    params
    // { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  API.setHeaderToken(access_token);
};

export const signUp = (data: UserType.SignUpUser) =>
  API.post<ApiTypes.SuccessRes>("/auth", data);
