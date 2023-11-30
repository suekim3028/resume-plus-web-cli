import { WebsiteTypes } from "@types";

// TODO: 수정 필요
export const META_DATA: Required<WebsiteTypes.MetaTags> = {
  ogUrl: process.env.NEXT_PUBLIC_FAST_API_SERVER,
  title: "",
  description: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogImageWidth: "720",
  ogImageHeight: "540",
  ogImageAlt: "",
} as const;
