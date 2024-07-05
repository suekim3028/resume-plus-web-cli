export type LoginType = "GOOGLE" | "EMAIL";

export type User = {
  id: number;
  name: string;
  email: string;
  user_id: string;
  login_type: LoginType;
  default_resume: string;
  remain_interview: number;
};

export type Token = {
  grant_type: string;
  access_token: string;
  refresh_token: string;
};

export type SignUpUser = Pick<User, "name" | "email" | "user_id"> & {
  password: string;
};

export type SignInUser = Pick<User, "id"> & { password: string };
