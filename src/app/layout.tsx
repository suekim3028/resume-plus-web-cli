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
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DSVKJPLVY4"
        ></script>
        <script
          type={"text/javascript"}
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-DSVKJPLVY4');`,
          }}
        ></script>
      </head>
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
