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

/** Must match {@link STAFF_JWT_KID} in lib/staff-jwt.ts (JWT header + JWKS). */
const STAFF_JWT_KID = process.env.AUTH_JWT_KID ?? "aztran-staff-1";

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
jwk.kid = STAFF_JWT_KID;

const jwks = JSON.stringify({ keys: [jwk] });

/** One env var line for Vercel (backslash-n); matches lib replace(/\\n/g, "\n"). */
function pemToSingleLine(pem) {
  return pem.trim().replace(/\r\n/g, "\n").split("\n").join("\\n");
}

console.log("--- Set AUTH_JWT_ISSUER (same in Next.js + Convex) ---\n");
console.log(issuer);
console.log("\n--- JWT kid (header + JWKS; matches lib/staff-jwt.ts) ---\n");
console.log(STAFF_JWT_KID);
console.log("\n--- AUTH_JWT_PRIVATE_KEY (Next.js only; multiline PEM) ---\n");
console.log(privPemStr);
console.log("\n--- AUTH_JWT_PRIVATE_KEY (single line \\n for Vercel) ---\n");
console.log(pemToSingleLine(privPemStr));
console.log("\n--- AUTH_JWT_PUBLIC_KEY (multiline PEM) ---\n");
console.log(pubPemStr);
console.log("\n--- AUTH_JWT_PUBLIC_KEY (single line \\n for Vercel) ---\n");
console.log(pemToSingleLine(pubPemStr));
console.log("\n--- AUTH_JWT_JWKS (Convex; single-line JSON) ---\n");
console.log(jwks);
