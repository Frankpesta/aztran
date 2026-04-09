#!/usr/bin/env node
/**
 * Prints issuer suggestion, PKCS8 private key, SPKI public key, and JWKS JSON
 * for Convex custom JWT + Next.js cookie signing.
 *
 * Usage: node scripts/generate-auth-keys.mjs
 */
import {
  exportJWK,
  exportPKCS8,
  exportSPKI,
  generateKeyPair,
} from "jose";

const issuer =
  process.env.AUTH_JWT_ISSUER ?? "https://localhost:3000";

const { privateKey, publicKey } = await generateKeyPair("RS256", {
  modulusLength: 2048,
  /** Required so exportPKCS8 / exportSPKI work (Node Web Crypto defaults vary by version). */
  extractable: true,
});

// jose returns PEM strings here (not raw bytes).
const privPemStr = await exportPKCS8(privateKey);
const pubPemStr = await exportSPKI(publicKey);

const jwk = await exportJWK(publicKey);
jwk.use = "sig";
jwk.alg = "RS256";
jwk.kid = "aztran-staff-1";

const jwks = JSON.stringify({ keys: [jwk] });

console.log("--- Set AUTH_JWT_ISSUER (same in Next.js + Convex) ---\n");
console.log(issuer);
console.log("\n--- AUTH_JWT_PRIVATE_KEY (Next.js only; PEM) ---\n");
console.log(privPemStr);
console.log("\n--- AUTH_JWT_PUBLIC_KEY (Next.js + middleware) ---\n");
console.log(pubPemStr);
console.log("\n--- AUTH_JWT_JWKS (Convex dashboard; single-line JSON) ---\n");
console.log(jwks);
