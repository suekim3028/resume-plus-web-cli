import { API } from "@apis";
import type { AppProps } from "next/app";
import { PropsWithChildren, createContext, useState } from "react";
import { IconContext } from "react-icons";
import GlobalStyle from "src/styles/GlobalStyle";
import { defaultThemeLight } from "src/styles/defaultTheme";
import { ThemeProvider } from "styled-components";
import "../styles/global.style.css";

export const UserContext = createContext<{
  setUser: (username: string) => void;
  hasUser: boolean;
} | null>(null);

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<null | string>(null);

  return (
    <UserContext.Provider
      value={{
        setUser: (username: string) => setUser(username),
        hasUser: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={defaultThemeLight}>
        <IconContext.Provider
          value={{ size: "20px", style: { verticalAlign: "middle" } }}
        >
          <UserContextProvider>
            <Component {...pageProps} />
          </UserContextProvider>
        </IconContext.Provider>
      </ThemeProvider>
    </>
  );
}

API.initInstance({
  baseURL: process.env.NEXT_PUBLIC_FAST_API_SERVER,
});
