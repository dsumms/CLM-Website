import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/hero-image.splat",
        headers: [
          // Keep browsers revalidating so same-path updates don't get stuck stale.
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          // Cache aggressively at the CDN/edge for repeat visits across regions.
          { key: "CDN-Cache-Control", value: "public, max-age=31536000" },
          { key: "Vercel-CDN-Cache-Control", value: "public, max-age=31536000" },
        ],
      },
      {
        source: "/hero-image.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "CDN-Cache-Control", value: "public, max-age=604800" },
          { key: "Vercel-CDN-Cache-Control", value: "public, max-age=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
