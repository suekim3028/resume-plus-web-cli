import { UserTypes } from "@types";
import API from "./API";

export type UserResponse = {
  user: UserTypes.User;
  token: UserTypes.Token;
};

/**
 * 이메일 로그인
 */
export const emailSignIn = async (body: UserTypes.EmailSignInUser) =>
  API.post<UserResponse>(`/users/login`, { body });

/**
 * 구글 로그인 (회원가입 안돼있는 경우 자동 회원가입)
 */

type GoogleSignInReq = {
  id_token: string;
} & Pick<UserTypes.User, "email" | "name">;

export const googleSignIn = async (body: GoogleSignInReq) =>
  API.post<UserResponse>(`/oauth2/code/google`, { body });

/**
 * 이메일 회원가입
 */

export const signUp = (body: UserTypes.SignUpUser) =>
  API.post<UserResponse>("/users/signup", { body });

/**
 * token refresh
 */

export const refreshToken = (refreshToken: string) =>
  API.post<UserTypes.Token>("/users/refresh-token", {
    body: { token: refreshToken },
  });

/**
 * 이메일 중복 확인
 */

export const checkDuplicatedEmail = (email: string) =>
  API.post<boolean>("/users/duplicate-email", { body: { email } });

/**
 * 토큰 로그인
 */

export const tokenLogin = () =>
  API.get<UserResponse>("users/current-user", undefined, {
    // dummyData: {
    //   token: {
    //     access_token: "accessToken",
    //     grant_type: "Bearer",
    //     refresh_token: "refresh",
    //   },
    //   user: {
    //     default_resume: "이력서.pdf",
    //     email: "k.sue3028@gmail.com",
    //     id: 1,
    //     login_type: "EMAIL",
    //     name: "김수빈",
    //     remain_interview: 4,
    //   },
    // },
  });
