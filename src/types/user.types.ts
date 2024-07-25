export type LoginType = "GOOGLE" | "EMAIL";

export type User = {
  userId: number;
  name: string;
  email: string;
  loginType: LoginType;
  defaultResume: string;
  remainInterview: number;
};

export type Token = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
};

export type SignUpUser = Pick<User, "name" | "email"> & {
  password: string;
};

export type EmailSignInUser = Pick<User, "email"> & { password: string };
