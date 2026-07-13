import type { ReactNode } from "react";
import { createPageMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Santa Fe Video Production | Chile Line Media",
  description:
    "Chile Line Media is a video production company based in Santa Fe, New Mexico. We produce cinematic narrative films, commercial content, and branded documentaries throughout Santa Fe County and northern New Mexico.",
  path: "/santa-fe",
  absoluteTitle: true,
});

export default function SantaFeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {children}
    </>
  );
}
