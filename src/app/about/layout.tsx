import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Meet Chile Line Media, an independent New Mexico production studio creating narrative films, documentaries, and commercial work with a collaborative, hands-on approach.",
  path: "/about",
  image: "/images/about-location.jpg",
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
