import { authActions } from "@actions";
import { userApis } from "@apis";
import { TokenResponse } from "@react-oauth/google";
import { UserTypes } from "@types";

class UserSession {
  static instance: UserSession;

  constructor() {
    if (UserSession.instance) return UserSession.instance;
    UserSession.instance = this;
  }

  private _user: UserTypes.User | null = null;

  private async handleUserResponse(res: userApis.UserResponse) {
    this._user = res.user;
    await authActions.handleSignIn(res);
  }

  private removeUser() {
    this._user = null;
  }

  public get isGuestUser() {
    return this.user?.loginType === "GUEST";
  }

  public get user() {
    return this._user;
  }

  public async signOut() {
    await authActions.handleSignOut();
    this.removeUser();
  }

  public async signInWithGoogle(googleTokenResponse: TokenResponse) {
    const { token_type, access_token } = googleTokenResponse;

    const method = this.isGuestUser
      ? userApis.guestGoogleSignIn
      : userApis.googleSignIn;

    const { data, isError } = await method({
      tokenType: token_type,
      accessToken: access_token,
    });

    if (!isError) this.handleUserResponse(data);
  }

  public async signInWithEmail({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const method = this.isGuestUser
      ? userApis.guestEmailSignIn
      : userApis.emailSignIn;

    const { data, isError } = await method({
      email,
      password,
    });

    if (isError) {
      return { success: false };
    }
    this.handleUserResponse(data);
    return { success: true };
  }

  public async signUpWithEmail(params: {
    email: string;
    password: string;
    name: string;
  }) {
    const method = this.isGuestUser ? userApis.guestSignUp : userApis.signUp;

    const { data, isError } = await method(params);

    if (isError) {
      return { success: false };
    }
    this.handleUserResponse(data);
    return { success: true };
  }

  public async guestSignIn() {
    // const { setUser } = useUser();
    const { data, isError } = await userApis.guestLogin();

    if (isError) {
      return { success: false };
    }
    this.handleUserResponse(data);
    console.log(`[LOGIN] logged in as GUEST"}`);
    return { success: true };
  }
}

const _UserSession = new UserSession();

export default _UserSession;
