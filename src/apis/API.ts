import { userApis } from "@apis";
import { TokenStorage } from "@storage";
import { returnFetch } from "@web-core";

const API = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_API_SERVER,
  tokenHeaderFn: async () => {
    const token = TokenStorage.get();
    if (!token || !token?.accessToken || !token?.refreshToken) return null;

    return { Authorization: `Bearer ${token.accessToken}` };
  },
  onUnauthorizedError: async () => {
    try {
      const token = TokenStorage.get();
      if (!token) return;
      const refreshToken = token?.refreshToken;
      if (!refreshToken) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/user/login`,
        {
          body: JSON.stringify({
            loginType: "REFRESH",
            payload: {
              refreshToken,
            },
          }),
          method: "POST",
        }
      );

      if (res.ok) {
        const json = (await res.json()) as userApis.UserResponse;
        TokenStorage.set(json.token);
      } else {
        TokenStorage.remove();
      }
    } catch (e) {
      TokenStorage.remove();
    }
  },
});

export default API;
