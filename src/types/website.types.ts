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
  NEXT_PUBLIC_FAST_API_SERVER: string;
  NEXT_PUBLIC_WEB_BASE_URL: string;
};
