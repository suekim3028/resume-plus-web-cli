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
import { ChakraProvider, Flex } from "@chakra-ui/react";
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
              <div
                style={{
                  height: "100vh",
                  width: "100vw",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TopBar />
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                  }}
                >
                  <Component {...pageProps} />
                </div>
              </div>
            </RecoilRoot>
          </IconContext.Provider>
        </ThemeProvider>
      </ChakraProvider>
      <audio
        autoPlay={false}
        id="audioElement"
        style={{
          position: "fixed",
          left: -99999,
          top: -99999,
        }}
        controls={false}
        playsInline
      />
    </>
  );
}

API.initInstance({
  baseURL: process.env.NEXT_PUBLIC_FAST_API_SERVER,
});
