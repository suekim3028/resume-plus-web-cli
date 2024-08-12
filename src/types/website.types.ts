export type MetaTags = {
  title?: string;
  description?: string;
  ogUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogImageAlt?: string;
};

export type Env = {
  NEXT_PUBLIC_API_SERVER: string;
  GOOGLE_OAUTH_CLIENT_KEY: string;
  GOOGLE_SPEECH_API_KEY: string;
};
