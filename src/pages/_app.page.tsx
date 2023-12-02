import GlobalStyle from "src/styles/GlobalStyle";
import { defaultThemeLight } from "src/styles/defaultTheme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { IconContext } from "react-icons";
import "../styles/global.style.css";
import { API } from "@apis";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider
        theme={
          // colorScheme === "dark" ? defaultThemeDark :
          defaultThemeLight
        }
      >
        <IconContext.Provider
          value={{ size: "20px", style: { verticalAlign: "middle" } }}
        >
          <Component {...pageProps} />
        </IconContext.Provider>
      </ThemeProvider>
    </>
  );
}

API.initInstance({
  baseURL: process.env.NEXT_PUBLIC_FAST_API_SERVER,
});
