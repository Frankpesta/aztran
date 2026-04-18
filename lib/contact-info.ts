/** Public contact details for marketing pages and mailto/Google Mail links. */

export const CONTACT_EMAIL = "info@aztranlimited.com";

/** Opens Gmail compose in the browser (requires user to be signed into Gmail). */
export const CONTACT_EMAIL_GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`;

export const CONTACT_PHONE_DISPLAY = "08147243680";
export const CONTACT_PHONE_TEL = "+2348147243680";

export const CONTACT_ADDRESS_LINES = [
  "2, The Rock Drive, PropertyGate Centre",
  "Lekki Phase 1",
  "Lagos State, Nigeria",
] as const;

export const CONTACT_HOURS = "MON–FRI · 9:00 AM – 5:00 PM";

export const CONTACT_SOCIAL = {
  linkedin: "https://www.linkedin.com/company/aztran-global/",
  x: "https://x.com/Aztran_Global",
  instagram: "https://www.instagram.com/aztran_global_investments/",
} as const;
