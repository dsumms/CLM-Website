"use client";

import dynamic from "next/dynamic";

const SplatHero = dynamic(() => import("@/components/SplatHero"), {
  ssr: false,
});

export default function SplatHeroWrapper() {
  return <SplatHero />;
}
