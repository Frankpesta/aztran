/** Shown when Next/cookie auth works but Convex has not accepted the staff JWT yet. */
export const CONVEX_REJECTED_SESSION_UPLOAD =
  "You appear logged in here, but Convex has not accepted your staff token, so uploads stay disabled. In the Convex dashboard, set AUTH_JWT_ISSUER and AUTH_JWT_JWKS to match this app's signing keys, deploy, then refresh. If you changed env vars, sign out and sign in again.";
