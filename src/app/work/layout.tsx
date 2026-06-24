import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Our Work — Film & Commercial Production",
  description:
    "Explore Chile Line Media's narrative films and commercial storytelling projects produced with a cinematic sense of place in New Mexico and the Southwest.",
  path: "/work",
});

export default function WorkLayout({ children }: { children: ReactNode }) {
  return children;
}
