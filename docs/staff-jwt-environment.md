# Staff JWT: environment variables

Convex custom JWT auth and the Next.js staff cookie share one **RSA key pair**. The **issuer** string must match **exactly** everywhere tokens are signed or verified.

## Issuer

Use your deployed site origin **without** a trailing slash, for example:

- Production (Vercel preview/production): `https://aztran.vercel.app`
- Local dev: `https://localhost:3000` (or whatever you use)

Set the **same** value in **Vercel** and **Convex**:

| Variable            | Value (example)              |
| ------------------- | ---------------------------- |
| `AUTH_JWT_ISSUER`   | `https://aztran.vercel.app` |

## Vercel (Next.js)

| Variable                 | Purpose |
| ------------------------ | ------- |
| `AUTH_JWT_ISSUER`        | `iss` claim on signed JWTs; must match Convex. |
| `AUTH_JWT_PRIVATE_KEY`   | PKCS#8 PEM, **private** — signs tokens at login. **Never** put this in Convex or client code. |
| `AUTH_JWT_PUBLIC_KEY`    | SPKI PEM, **public** — `middleware` verifies the cookie. Same key as in JWKS, different encoding. |

**PEM in Vercel (one line):** Prefer the **single-line** form from `generate-auth-keys.mjs` (PEM lines joined with the two characters `\` + `n`). The app converts those to real newlines via `replace(/\\n/g, "\n")`. Multiline PEM in the env var also works if your host preserves line breaks.

## Convex (dashboard → your deployment)

| Variable           | Purpose |
| ------------------ | ------- |
| `AUTH_JWT_ISSUER`  | Same string as Vercel. |
| `AUTH_JWT_JWKS`    | Single-line JSON: `{"keys":[...]}` with the **public** key(s). Used to verify tokens. **Not** the private key. |

`convex/auth.config.ts` also sets `applicationID: "convex"`, which matches the JWT **audience** (`convex`) set in `lib/staff-jwt.ts`.

## Generating keys

From the repo root:

```bash
AUTH_JWT_ISSUER="https://aztran.vercel.app" node scripts/generate-auth-keys.mjs
```

The script prints, in order:

1. Suggested `AUTH_JWT_ISSUER` (already one line)
2. `AUTH_JWT_PRIVATE_KEY` multiline PEM, then **the same key as one line** (use this for Vercel)
3. `AUTH_JWT_PUBLIC_KEY` multiline, then **one line** for Vercel
4. `AUTH_JWT_JWKS` → Convex (one-line JSON)

To save output locally without committing secrets:

```bash
AUTH_JWT_ISSUER="https://aztran.vercel.app" node scripts/generate-auth-keys.mjs > staff-jwt-keys.generated.md
```

`staff-jwt-keys.generated.md` is gitignored. **Do not** commit private keys.

## JWT header `kid` (required by Convex)

Convex expects protected-header fields including **`kid`**, **`alg`**, and **`typ`**. Tokens are signed with `kid: aztran-staff-1` in `lib/staff-jwt.ts`, and the same `kid` must appear on the public key inside **`AUTH_JWT_JWKS`**. If you regenerate keys, keep `kid` aligned (see `scripts/generate-auth-keys.mjs`).

## Inline `AUTH_JWT_JWKS` in Convex

The Custom JWT provider expects `jwks` to be a **URL** or a **`data:` URI** ([docs](https://docs.convex.dev/auth/advanced/custom-jwt)). This repo’s `convex/auth.config.ts` wraps raw JSON from the env in a `data:text/plain;base64,...` URI automatically, so pasting the one-line `{"keys":[...]}` value from the key script into Convex still works.

## After changing keys or issuer

- Redeploy **Vercel** and **Convex** (or sync env and push) so both sides pick up changes.
- Have every staff user **sign out and sign in again** so cookies carry tokens signed with the new key/issuer and **`kid`**.

## Quick mapping

```
Key pair
├── Private (PEM)     → AUTH_JWT_PRIVATE_KEY  → Vercel only (sign)
├── Public (PEM)      → AUTH_JWT_PUBLIC_KEY   → Vercel (middleware verify)
└── Public (JWKS JSON) → AUTH_JWT_JWKS        → Convex (verify)
```
