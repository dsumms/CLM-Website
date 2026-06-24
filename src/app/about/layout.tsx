import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Meet Chile Line Media, a New Mexico production company telling cinematic stories rooted in the Southwest, regional voices, and ethical collaboration.",
  path: "/about",
  image: "/images/about-location.jpg",
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
