import { RecoilRootWrapper } from "@components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RecoilRootWrapper>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_KEY}>
            <StrictMode>{children}</StrictMode>
          </GoogleOAuthProvider>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
