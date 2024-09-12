import { Initializer } from "@components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ModalWrapper } from "@web-core";
import Script from "next/script";
import { StrictMode } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="body">
        <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_KEY}>
          <Initializer>
            <StrictMode>
              <ModalWrapper>{children}</ModalWrapper>
            </StrictMode>
          </Initializer>
        </GoogleOAuthProvider>

        <Script src="https://cdn.amplitude.com/libs/analytics-browser-2.10.0-min.js.gz" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-jp-dynamic-subset.min.css"
        />
      </body>
    </html>
  );
}
