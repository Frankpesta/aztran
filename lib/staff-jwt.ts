import { SignJWT, importPKCS8, jwtVerify, importSPKI } from "jose";

export const STAFF_AUTH_COOKIE_NAME = "aztran_staff_token";
const AUDIENCE = "convex";

export async function signStaffSessionToken(staffId: string): Promise<string> {
  const issuer = process.env.AUTH_JWT_ISSUER;
  const pem = process.env.AUTH_JWT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!issuer || !pem) {
    throw new Error("AUTH_JWT_ISSUER and AUTH_JWT_PRIVATE_KEY must be set");
  }
  const key = await importPKCS8(pem, "RS256");
  return new SignJWT({})
    .setProtectedHeader({ alg: "RS256" })
    .setSubject(staffId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .setIssuer(issuer)
    .setAudience(AUDIENCE)
    .sign(key);
}

export async function verifyStaffSessionToken(token: string): Promise<string> {
  const issuer = process.env.AUTH_JWT_ISSUER;
  const pem = process.env.AUTH_JWT_PUBLIC_KEY?.replace(/\\n/g, "\n");
  if (!issuer || !pem) {
    throw new Error("AUTH_JWT_ISSUER and AUTH_JWT_PUBLIC_KEY must be set");
  }
  const key = await importSPKI(pem, "RS256");
  const { payload } = await jwtVerify(token, key, {
    issuer,
    audience: AUDIENCE,
  });
  if (!payload.sub) {
    throw new Error("Invalid token");
  }
  return payload.sub;
}
