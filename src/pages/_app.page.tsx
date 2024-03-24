import { API } from "@apis";
import type { AppProps } from "next/app";
import { IconContext } from "react-icons";
import { RecoilRoot } from "recoil";
import GlobalStyle from "src/styles/GlobalStyle";
import { defaultThemeLight } from "src/styles/defaultTheme";
import { ThemeProvider } from "styled-components";
import "../styles/global.style.css";
import { AppHead, TopBar } from "@components";
import { Layout as L } from "@design-system";
import { ChakraProvider } from "@chakra-ui/react";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <GlobalStyle />
        <ThemeProvider theme={defaultThemeLight}>
          <IconContext.Provider
            value={{ size: "20px", style: { verticalAlign: "middle" } }}
          >
            <RecoilRoot>
              <AppHead />
              <L.FlexCol w={"100%"}>
                <TopBar />
                <Component {...pageProps} />
              </L.FlexCol>
            </RecoilRoot>
          </IconContext.Provider>
        </ThemeProvider>
      </ChakraProvider>
    </>
  );
}

API.initInstance({
  baseURL: process.env.NEXT_PUBLIC_FAST_API_SERVER,
});
