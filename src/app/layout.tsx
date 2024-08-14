import { Initializer } from "@components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from "next/script";
import { StrictMode, Suspense } from "react";
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
            <Suspense fallback={<>...Loading</>}>
              <StrictMode>{children}</StrictMode>
            </Suspense>
          </Initializer>
        </GoogleOAuthProvider>

        <Script src="https://cdn.amplitude.com/libs/analytics-browser-2.10.0-min.js.gz" />
      </body>
    </html>
  );
}
