export const SITE_URL = "https://example.com" as const;
export const DEFAULT_TWITTER_HANDLE = "" as const;
export const DEFAULT_SITE_NAME = "Achmadya Ridwan Ilyawan" as const;

type SeoInput = {
  title: string;
  description?: string;
  keywords?: string;
  /** Absolute URL or path starting with `/` */
  image?: string;
  /** Absolute URL or path starting with `/` */
  url?: string;
  /** Canonical URL (absolute or path starting with `/`). If omitted, no canonical link is emitted. */
  canonicalUrl?: string;
  type?: "website" | "article";
  siteName?: string;
  twitterSite?: string;
  twitterCreator?: string;
};

const resolveUrl = (value: string) => {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
};

export const seo = ({
  title,
  description,
  keywords,
  image,
  url,
  canonicalUrl,
  type = "website",
  siteName = DEFAULT_SITE_NAME,
  twitterSite = DEFAULT_TWITTER_HANDLE,
  twitterCreator = DEFAULT_TWITTER_HANDLE,
}: SeoInput) => {
  const resolvedUrl = url ? resolveUrl(url) : undefined;
  const resolvedImage = image ? resolveUrl(image) : undefined;
  const resolvedCanonical = canonicalUrl ? resolveUrl(canonicalUrl) : undefined;

  const meta = [
    { title },
    ...(description ? [{ name: "description", content: description }] : []),
    ...(keywords ? [{ name: "keywords", content: keywords }] : []),
    { property: "og:type", content: type },
    { property: "og:title", content: title },
    ...(description
      ? [{ property: "og:description", content: description }]
      : []),
    ...(resolvedUrl ? [{ property: "og:url", content: resolvedUrl }] : []),
    { property: "og:site_name", content: siteName },
    ...(resolvedImage
      ? [{ property: "og:image", content: resolvedImage }]
      : []),
    {
      name: "twitter:card",
      content: resolvedImage ? "summary_large_image" : "summary",
    },
    { name: "twitter:title", content: title },
    ...(description
      ? [{ name: "twitter:description", content: description }]
      : []),
    ...(resolvedImage
      ? [{ name: "twitter:image", content: resolvedImage }]
      : []),
    ...(twitterSite ? [{ name: "twitter:site", content: twitterSite }] : []),
    ...(twitterCreator
      ? [{ name: "twitter:creator", content: twitterCreator }]
      : []),
  ];

  const links = resolvedCanonical
    ? [{ rel: "canonical", href: resolvedCanonical }]
    : [];

  return { meta, links };
};
