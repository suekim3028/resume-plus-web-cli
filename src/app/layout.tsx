import { Initializer } from "@components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ModalWrapper } from "@web-core";
import type { Metadata } from "next";
import { StrictMode, Suspense } from "react";
import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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
        {/* <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_KEY}> */}

        <Initializer>
          <StrictMode>
            <ModalWrapper>{children}</ModalWrapper>
          </StrictMode>
        </Initializer>

        {/* </GoogleOAuthProvider> */}
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  title: "인터뷰플러스",
  description: "혼자서도 자신 있는 면접 연습",
};

export default RootLayout;