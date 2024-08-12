import { Initializer, RecoilRootWrapper } from "@components";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
        <RecoilRootWrapper>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_KEY}>
            <Initializer>
              <StrictMode>{children}</StrictMode>
            </Initializer>
          </GoogleOAuthProvider>
        </RecoilRootWrapper>
        <Script src="https://cdn.amplitude.com/libs/analytics-browser-2.10.0-min.js.gz" />
      </body>
    </html>
  );
}
