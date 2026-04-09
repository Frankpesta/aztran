import type { NextConfig } from "next";

function buildRemotePatterns(): NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
> {
  const patterns: NonNullable<
    NonNullable<NextConfig["images"]>["remotePatterns"]
  > = [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
    },
    // Subdomain wildcard (see Next `remotePatterns` / picomatch rules).
    {
      protocol: "https",
      hostname: "**.convex.cloud",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "**.convex.site",
      pathname: "/**",
    },
  ];
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (convexUrl) {
    try {
      const host = new URL(convexUrl).hostname;
      if (
        host &&
        !patterns.some((p) => "hostname" in p && p.hostname === host)
      ) {
        patterns.push({
          protocol: "https",
          hostname: host,
          pathname: "/**",
        });
      }
    } catch {
      /* invalid NEXT_PUBLIC_CONVEX_URL at config time */
    }
  }
  return patterns;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: buildRemotePatterns(),
  },
};

export default nextConfig;
