import { UserTypes } from "@types";
import API from "./API";

export type UserResponse = {
  user: UserTypes.User;
  token: UserTypes.Token;
};

/**
 * 이메일 로그인
 */
export const emailSignIn = async (params: UserTypes.SignInUser) =>
  API.post<UserResponse>(`/users/login`, params);

/**
 * 구글 로그인 (회원가입 안돼있는 경우 자동 회원가입)
 */

type GoogleSignInReq = {
  id_token: string;
} & Pick<UserTypes.User, "email" | "name">;

export const googleSignIn = async (params: GoogleSignInReq) =>
  API.post<UserResponse>(`/oauth2/code/google`, params);

/**
 * 이메일 회원가입
 */

export const signUp = (data: UserTypes.SignUpUser) =>
  API.post<UserResponse>("/users/signup", data);

/**
 * token refresh
 */

export const refreshToken = (refreshToken: string) =>
  API.post<UserTypes.Token>("/users/refresh-token", { token: refreshToken });

/**
 * 이메일 중복 확인
 */

export const checkDuplicatedEmail = (email: string) =>
  API.post<boolean>("/users/duplicate-email", { email });
