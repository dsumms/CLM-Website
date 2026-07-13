import type { ReactNode } from "react";
import { createPageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Video Production Services | Chile Line Media — New Mexico",
  description:
    "Commercial, narrative, and branded video production services in New Mexico. From concept to final delivery — cinematic storytelling rooted in the Southwest.",
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
