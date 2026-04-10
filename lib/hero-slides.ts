/**
 * Homepage hero photography — building + home slides with crossfade (`HeroSection`).
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

/** Full hero rotation: office building first, then home photography. */
export const HERO_SLIDES: readonly HeroSlide[] = [
  HERO_PRIMARY_IMAGE,
  { src: "/images/home1.jpeg", alt: "" },
  { src: "/images/home2.jpeg", alt: "" },
  { src: "/images/home3.jpeg", alt: "" },
  { src: "/images/home4.jpeg", alt: "" },
];

export const HERO_SLIDE_INTERVAL_MS = 6500;

export function isRemoteHeroImage(src: string): boolean {
  return src.startsWith("https://") || src.startsWith("http://");
}
