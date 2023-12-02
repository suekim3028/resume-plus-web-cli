import API from "./API";

type SignInParams = {
  email: string;
  password: string;
};

type SignInResponse = {
  token: string;
};

export const signIn = (params: SignInParams) =>
  API.post<SignInResponse>("", { data: params });
