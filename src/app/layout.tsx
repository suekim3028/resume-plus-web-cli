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
          <GoogleOAuthProvider clientId="887229180830-e4kj5rqe9avj5ctoj50e2bpv0h7b5k13.apps.googleusercontent.com">
            <StrictMode>{children}</StrictMode>
          </GoogleOAuthProvider>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
