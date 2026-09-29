import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Our Work — Film & Commercial Production",
  description:
    "Explore selected narrative films and commercial projects from Chile Line Media, an independent production studio based in New Mexico.",
  path: "/work",
});

export default function WorkLayout({ children }: { children: ReactNode }) {
  return children;
}
