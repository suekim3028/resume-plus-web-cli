import { Initializer } from "@components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ModalWrapper } from "@web-core";
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
      </body>
    </html>
  );
}
