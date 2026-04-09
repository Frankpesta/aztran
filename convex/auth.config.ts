export default {
  providers: [
    {
      type: "customJwt" as const,
      issuer: process.env.AUTH_JWT_ISSUER!,
      algorithm: "RS256" as const,
      jwks: process.env.AUTH_JWT_JWKS!,
      applicationID: "convex",
    },
  ],
};
