import { WEBSITE_CONSTS } from "@constants";
import { useWindowSizeChange } from "@hooks";
import { WebsiteTypes } from "@types";
import Head from "next/head";

const AppHead = ({
  metaTags: metaTagsProps,
}: {
  metaTags?: WebsiteTypes.MetaTags;
}) => {
  const getMetaData = (key: keyof WebsiteTypes.MetaTags) =>
    metaTagsProps?.[key] || WEBSITE_CONSTS.META_DATA[key];

  const { width, scale } = useWindowSizeChange();

  return (
    <Head>
      <meta name="robots" content="all" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta
        name="viewport"
        content={`width=${
          width || "device-width"
        }, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale=${scale}, user-scalable=0`}
      />
      <title>{getMetaData("title")}</title>
      <meta name="description" content={getMetaData("description")} />
      <link rel="canonical" href={process.env.NEXT_PUBLIC_WEB_BASE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={getMetaData("ogTitle")} />
      <meta property="og:description" content={getMetaData("ogDescription")} />
      <meta property="og:image" content={getMetaData("ogImage")} />
      <meta
        key="og:image:width"
        property="og:image:width"
        content={getMetaData("ogImageWidth")}
      />
      <meta
        key="og:image:height"
        property="og:image:height"
        content={getMetaData("ogImageHeight")}
      />
      <meta
        key="og:image:alt"
        property="og:image:alt"
        content={getMetaData("ogImageAlt")}
      />
      <meta property="og:url" content={getMetaData("ogUrl")} />
    </Head>
  );
};

export default AppHead;
