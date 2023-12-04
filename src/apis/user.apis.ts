import API from "./API";

type SignInParams = {
  username: string;
  password: string;
};

type SignInResponse = {
  access_token: string;
};

export const signIn = async ({ username, password }: SignInParams) => {
  const { access_token } = await API.post<SignInResponse>(
    `/auth/token?username=${username}&password=${password}`
  );
  console.log({ access_token });
  API.setHeaderToken(access_token);
};
