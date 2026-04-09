import type { AuthConfig } from "convex/server";

/**
 * Convex custom JWT accepts `jwks` as a URL or a data URI (see
 * https://docs.convex.dev/auth/advanced/custom-jwt ). Raw JSON from the dashboard
 * is base64-wrapped so it is never mistaken for a broken URL.
 */
function utf8ToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary);
}

function normalizeAuthJwtJwks(raw: string): string {
  const v = raw.trim();
  if (
    v.startsWith("http://") ||
    v.startsWith("https://") ||
    v.startsWith("data:")
  ) {
    return v;
  }
  return `data:text/plain;charset=utf-8;base64,${utf8ToBase64(v)}`;
}

export default {
  providers: [
    {
      type: "customJwt" as const,
      issuer: process.env.AUTH_JWT_ISSUER!,
      algorithm: "RS256" as const,
      jwks: normalizeAuthJwtJwks(process.env.AUTH_JWT_JWKS!),
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
