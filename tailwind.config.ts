import type { Config } from "tailwindcss";

/**
 * Tailwind theme extensions mirror CSS custom properties defined in `app/globals.css`.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "var(--color-navy)",
        "brand-cyan": "var(--color-cyan)",
        silver: "var(--color-silver)",
        offwhite: "var(--color-offwhite)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: [
          "var(--font-body)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        hero: "var(--text-hero)",
        h1: "var(--text-h1)",
        h2: "var(--text-h2)",
        h3: "var(--text-h3)",
        body: "var(--text-body)",
        label: "var(--text-label)",
        caption: "var(--text-caption)",
      },
      maxWidth: {
        container: "var(--space-container)",
      },
      spacing: {
        section: "var(--space-section)",
      },
      keyframes: {
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "marquee-slow": "marquee-x 70s linear infinite",
        "marquee-medium": "marquee-x 52s linear infinite",
        "marquee-fast": "marquee-x 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
