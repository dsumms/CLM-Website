import type { ReactNode } from "react";
import { createPageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Video Production Services | Chile Line Media — New Mexico",
  description:
    "Explore Chile Line Media's narrative, documentary, commercial, and post-production services from our New Mexico studio.",
  path: "/services",
  absoluteTitle: true,
});

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {children}
    </>
  );
}
