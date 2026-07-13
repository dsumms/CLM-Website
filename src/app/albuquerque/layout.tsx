import type { ReactNode } from "react";
import { createPageMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Albuquerque Video Production | Chile Line Media",
  description:
    "Chile Line Media provides video production services in Albuquerque, New Mexico. Commercial, narrative, and branded content from a Santa Fe-based production company serving the Albuquerque metro area.",
  path: "/albuquerque",
  absoluteTitle: true,
});

export default function AlbuquerqueLayout({ children }: { children: ReactNode }) {
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
