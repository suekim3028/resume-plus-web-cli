import { API } from "@apis";
import type { AppProps } from "next/app";
import { PropsWithChildren, createContext, useState } from "react";
import { IconContext } from "react-icons";
import GlobalStyle from "src/styles/GlobalStyle";
import { defaultThemeLight } from "src/styles/defaultTheme";
import { ThemeProvider } from "styled-components";
import "../styles/global.style.css";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={defaultThemeLight}>
        <IconContext.Provider
          value={{ size: "20px", style: { verticalAlign: "middle" } }}
        >
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </IconContext.Provider>
      </ThemeProvider>
    </>
  );
}

API.initInstance({
  baseURL: process.env.NEXT_PUBLIC_FAST_API_SERVER,
});
