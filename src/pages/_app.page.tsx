import GlobalStyle from "src/styles/GlobalStyle";
import { defaultThemeLight } from "src/styles/defaultTheme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

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
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
