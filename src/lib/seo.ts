import type { Metadata } from "next";

export const siteUrl = "https://www.chilelinemedia.com";
export const siteName = "Chile Line Media";
export const defaultTitle = "Chile Line Media | New Mexico Video Production";
export const defaultDescription =
  "Independent narrative and branded storytelling company based in New Mexico. We specialize in cinematic commercial and narrative video production.";
export const defaultOgImage = "/logo-full.png";

export const socialLinks = [
  "https://www.youtube.com/@ChileLineMedia",
  "https://www.instagram.com/chilelinemedia/",
  "https://www.tiktok.com/@chilelinemedia",
];

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  absoluteTitle?: boolean;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function truncateDescription(description: string, maxLength = 160) {
  const normalized = description.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 3).trim()}...`;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = defaultOgImage,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteName,
  url: siteUrl,
  logo: absoluteUrl(defaultOgImage),
  description: defaultDescription,
  sameAs: socialLinks,
  address: {
    "@type": "PostalAddress",
    addressRegion: "NM",
    addressCountry: "US",
  },
  areaServed: ["New Mexico", "Santa Fe, NM", "Albuquerque, NM"],
  priceRange: "$$",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.6870,
    longitude: -105.9378,
  },
};

export const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Video Production",
  provider: {
    "@type": "LocalBusiness",
    name: siteName,
    url: siteUrl,
  },
  areaServed: "New Mexico",
  description: "Commercial, narrative, and branded video production services in New Mexico.",
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  publisher: {
    "@type": "Organization",
    name: siteName,
  },
};
