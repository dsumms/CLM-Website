import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Footer from "@/components/Footer";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chilelinemedia.com"),
  title: {
    default: "Chile Line Media | New Mexico Video Production",
    template: "%s | Chile Line Media",
  },
  description: "Independent narrative and branded storytelling company based in New Mexico. We specialize in cinematic commercial and narrative video production.",
  keywords: ["video production", "New Mexico", "film production", "storytelling", "commercials", "narrative films", "documentaries", "Santa Fe", "Albuquerque"],
  openGraph: {
    title: "Chile Line Media | New Mexico Video Production",
    description: "Independent narrative and branded storytelling company based in New Mexico.",
    url: "https://chilelinemedia.com",
    siteName: "Chile Line Media",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chile Line Media | New Mexico Video Production",
    description: "Independent narrative and branded storytelling company based in New Mexico.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Chile Line Media",
              "url": "https://chilelinemedia.com",
              "description": "Independent narrative and branded storytelling company based in New Mexico.",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "NM",
                "addressCountry": "US"
              }
            })
          }}
        />
      </head>
      <body className={ebGaramond.variable}>
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
