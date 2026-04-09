import type { ReactElement } from "react";

type ConvexStorageImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** Maps to `fetchPriority="high"` for LCP images. */
  priority?: boolean;
};

/**
 * Renders Convex `storage.getUrl` assets with a plain `img` so Vercel production
 * is not blocked by `next/image` remotePatterns (wildcard quirks, custom Convex URLs).
 */
export function ConvexStorageImage({
  src,
  alt,
  className,
  priority,
}: ConvexStorageImageProps): ReactElement {
  return (
    // Convex URLs are app-controlled; avoids next/image optimizer allowlist.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      {...(priority ? { fetchPriority: "high" as const } : {})}
    />
  );
}
