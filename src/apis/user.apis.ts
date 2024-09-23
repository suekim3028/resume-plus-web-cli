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
  API.post<UserResponse>(`/users/email-login`, { body });

/**
 * 구글 로그인 (회원가입 안돼있는 경우 자동 회원가입)
 */

type GoogleSignInReq = {
  tokenType: string;
  accessToken: string;
};

export const googleSignIn = async (body: GoogleSignInReq) =>
  API.post<UserResponse>(`/users/google-login`, { body });

/**
 * 게스트 구글 로그인
 */

export const guestGoogleSignIn = (body: GoogleSignInReq) =>
  API.post<UserResponse>("/users/guest/google-login", { body });

/**
 * 이메일 회원가입
 */

export const signUp = (body: UserTypes.SignUpUser) =>
  API.post<UserResponse>("/users/", { body });

/**
 * 게스트 이메일 회원가입
 */

export const guestSignUp = (body: UserTypes.SignUpUser) =>
  API.post<UserResponse>("/users/guest/email-login", { body });

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
  API.post<boolean>(
    "/users/duplicate-email",
    { body: { email } }
    // { dummyData: false, dummyWaitSecs: 1 }
  );

/**
 * 토큰 로그인
 */

export const tokenLogin = () =>
  API.get<UserTypes.User>("users/current-user", undefined, {
    // dummyData: {
    //   token: {
    //     accessToken: "accessToken",
    //     grant_type: "Bearer",
    //     refreshToken: "refresh",
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

/** 게스트 로그인 */
export const guestLogin = () => API.post<UserResponse>("/users/guest");

/**
 * 인증번호 보내기
 */
export const sendVerificationCode = ({ email }: { email: string }) =>
  API.post(
    "users/send-verification-code",
    {
      body: { email },
    },
    {
      dummyData: { verificationCode: "1234" },
      useDummy: false,
    }
  );

/**
 * 인증번호 확인
 */
export const checkVerificationCode = (data: {
  email: string;
  verificationCode: string;
}) => API.post<boolean>("/users/verify-code", { body: data });
