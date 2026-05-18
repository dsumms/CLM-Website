import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Process",
  description:
    "See Chile Line Media's production process, from discovery and pre-production through filming, post-production, and final delivery.",
  path: "/process",
  image: "/images/process/production.jpg",
});

export default function ProcessLayout({ children }: { children: ReactNode }) {
  return children;
}
