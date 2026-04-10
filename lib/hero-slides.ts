/**
 * Homepage hero photography — single full-bleed asset with Ken Burns (`HeroSection`).
 */
export type HeroSlide = {
  src: string;
  alt: string;
};

/** Building / brand hero image (local, `public/images/`). */
export const HERO_PRIMARY_IMAGE: HeroSlide = {
  src: "/images/hero-bg.jpg",
  alt: "",
};

/** @deprecated Use `HERO_PRIMARY_IMAGE`; kept so imports of `HERO_SLIDES` still resolve. */
export const HERO_SLIDES: readonly HeroSlide[] = [HERO_PRIMARY_IMAGE];

export const HERO_SLIDE_INTERVAL_MS = 6500;

export function isRemoteHeroImage(src: string): boolean {
  return src.startsWith("https://") || src.startsWith("http://");
}
