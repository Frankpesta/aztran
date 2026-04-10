/** Statutory name — use in nav, footer, hero, and legal contexts. */
export const COMPANY_LEGAL_NAME = "Aztran Global Investments Limited";

/** Primary / full-color logo (`public/logo.png`) — used in the header and wherever the brand mark should match print. */
export const SITE_LOGO_PATH = "/logo.png" as const;

/** High-contrast logo for dark surfaces (`public/logo-w.png`) — e.g. footer on navy. */
export const SITE_LOGO_PATH_ON_DARK = "/logo-w.png" as const;

/** Canonical brand literals for environments that cannot read CSS custom properties (e.g. email HTML). */
export const BRAND = {
  navy: "#001F3F",
  cyan: "#0CC0DF",
  silver: "#D3DBDA",
  white: "#FFFFFF",
  offwhite: "#F5F7F6",
} as const;
