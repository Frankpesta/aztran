"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactElement } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import { useUiStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { COMPANY_LEGAL_NAME, SITE_LOGO_PATH } from "@/lib/brand";

const LINKS: readonly { href: string; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/insights", label: "Insights" },
  { href: "/blog", label: "Blog" },
  { href: "/market-reports", label: "Reports" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Primary public navigation with scroll-aware styling and a full-screen mobile overlay.
 */
export function Navbar(): ReactElement {
  useNavbarScroll();
  const isScrolled = useUiStore((s) => s.isScrolled);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isHome = pathname === "/";
  const isAboutOrServices =
    pathname === "/about" || pathname === "/services";
  const isDarkMode = mounted && resolvedTheme === "dark";

  type HeaderSurface = "home-top" | "home-scroll" | "dark-glass" | "navy";
  const headerSurface: HeaderSurface = (() => {
    if (isHome && isDarkMode) {
      if (!isScrolled) return "dark-glass";
      return "navy";
    }
    if (isHome && !isScrolled) return "home-top";
    if (isHome && isScrolled) return "home-scroll";
    if (isAboutOrServices && !isScrolled) return "dark-glass";
    return "navy";
  })();

  const brightHomeChrome =
    (headerSurface === "home-top" || headerSurface === "home-scroll") &&
    !isDarkMode;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 isolate overflow-visible transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-out",
        headerSurface === "home-top" &&
          "border-b border-[color-mix(in_srgb,var(--color-navy)_10%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_78%,transparent)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.92)] backdrop-blur-2xl backdrop-saturate-150 dark:border-[color-mix(in_srgb,var(--color-white)_12%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_52%,transparent)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
        headerSurface === "home-scroll" &&
          "border-b border-[color-mix(in_srgb,var(--color-navy)_12%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_94%,var(--color-offwhite))] shadow-[0_12px_40px_-18px_rgba(0,31,63,0.14)] backdrop-blur-xl dark:border-[color-mix(in_srgb,var(--color-cyan)_26%,transparent)] dark:bg-[var(--color-navy-95)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)]",
        headerSurface === "dark-glass" &&
          "border-b border-[color-mix(in_srgb,var(--color-white)_18%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_10%,transparent)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)] backdrop-blur-2xl backdrop-saturate-150 dark:border-[color-mix(in_srgb,var(--color-white)_10%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_42%,transparent)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
        headerSurface === "navy" &&
          "border-b border-[color-mix(in_srgb,var(--color-cyan)_28%,transparent)] bg-[var(--color-navy-95)] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)] backdrop-blur-xl",
      )}
    >
      <nav
        className="mx-auto flex min-h-[4.25rem] h-[4.25rem] max-w-container items-center justify-between overflow-visible px-4 md:min-h-[4.75rem] md:h-[4.75rem] md:px-8"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group relative z-[1] flex shrink-0 items-center transition-opacity duration-300 hover:opacity-[0.97]"
        >
          <span
            className={cn(
              "inline-flex items-center rounded-xl transition-[background-color,box-shadow,backdrop-filter] duration-300",
              brightHomeChrome &&
                "bg-[color-mix(in_srgb,var(--color-white)_98%,transparent)] px-2.5 py-1.5 shadow-[0_4px_20px_-8px_rgba(0,31,63,0.18)] ring-1 ring-[color-mix(in_srgb,var(--color-navy)_08%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-offwhite)_92%,white)] dark:ring-[color-mix(in_srgb,var(--color-white)_18%,transparent)]",
              !brightHomeChrome &&
                headerSurface === "dark-glass" &&
                "bg-[color-mix(in_srgb,var(--color-white)_26%,transparent)] px-2.5 py-1.5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.45)] ring-1 ring-[color-mix(in_srgb,var(--color-white)_38%,transparent)] backdrop-blur-xl dark:bg-[color-mix(in_srgb,var(--color-white)_14%,transparent)] dark:ring-[color-mix(in_srgb,var(--color-white)_22%,transparent)]",
              !brightHomeChrome &&
                headerSurface === "navy" &&
                "bg-[color-mix(in_srgb,var(--color-white)_97%,var(--color-offwhite))] px-2.5 py-1.5 shadow-[0_6px_28px_-10px_rgba(0,0,0,0.42)] ring-1 ring-[color-mix(in_srgb,var(--color-navy)_10%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-offwhite)_94%,white)] dark:ring-[color-mix(in_srgb,var(--color-white)_14%,transparent)]",
            )}
          >
            <Image
              src={SITE_LOGO_PATH}
              alt={COMPANY_LEGAL_NAME}
              width={960}
              height={288}
              priority
              className="h-8 w-auto max-w-[min(82vw,280px)] object-contain object-left sm:h-9 sm:max-w-[300px] md:h-9 md:max-w-[320px] lg:h-10 lg:max-w-[360px]"
            />
          </span>
          <span className="sr-only">{COMPANY_LEGAL_NAME}</span>
        </Link>
        <div className="hidden items-center gap-4 md:flex md:gap-5 lg:gap-6">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative font-body text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 hover:text-[var(--color-cyan)] md:text-[11px] md:tracking-[0.16em]",
                brightHomeChrome
                  ? "text-[color-mix(in_srgb,var(--color-navy)_70%,transparent)] dark:text-[color-mix(in_srgb,var(--color-offwhite)_88%,transparent)]"
                  : "text-[color-mix(in_srgb,var(--color-silver)_92%,white)]",
              )}
            >
              {item.label}
              <span className="nav-underline absolute bottom-[-4px] left-0 h-px w-full origin-left bg-[var(--color-cyan)]" />
            </Link>
          ))}
          <ThemeToggle
            variant="marketing"
            className={
              brightHomeChrome
                ? "border-[color-mix(in_srgb,var(--color-navy)_14%,transparent)] focus-visible:ring-offset-white dark:focus-visible:ring-offset-[var(--color-navy)]"
                : undefined
            }
          />
          <Link
            href="/contact"
            className={cn(
              "rounded-sm border px-3 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.14em] transition-[transform,background-color,color,box-shadow] duration-300 hover:-translate-y-0.5 md:px-3.5 md:py-2 md:text-[11px] md:tracking-[0.16em]",
              brightHomeChrome
                ? "border-[var(--color-cyan)] bg-[var(--color-cyan)] text-[var(--color-navy)] shadow-[0_8px_28px_-10px_color-mix(in_srgb,var(--color-cyan)_45%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-cyan)_92%,white)] hover:shadow-[0_12px_32px_-10px_color-mix(in_srgb,var(--color-cyan)_55%,transparent)] dark:border-[var(--color-cyan)] dark:bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)] dark:text-[var(--color-cyan)] dark:hover:bg-[var(--color-cyan)] dark:hover:text-[var(--color-navy)]"
                : "border-[var(--color-cyan)] bg-[color-mix(in_srgb,var(--color-cyan)_10%,transparent)] text-[var(--color-cyan)] backdrop-blur-sm hover:bg-[var(--color-cyan)] hover:text-[var(--color-navy)] hover:shadow-[0_0_32px_-6px_var(--color-cyan)]",
            )}
          >
            Get in Touch
          </Link>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle
            variant="marketing"
            className={
              brightHomeChrome
                ? "border-[color-mix(in_srgb,var(--color-navy)_14%,transparent)] focus-visible:ring-offset-white dark:focus-visible:ring-offset-[var(--color-navy)]"
                : undefined
            }
          />
          <button
            type="button"
            className={cn(
              "inline-flex",
              brightHomeChrome
                ? "text-[var(--color-navy)] dark:text-[var(--color-offwhite)]"
                : "text-[var(--color-white)]",
            )}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-7" />
          </button>
        </div>
      </nav>
      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  key="mobile-nav-overlay"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site navigation"
                  className="fixed inset-0 z-[200] flex min-h-dvh flex-col bg-[#001f3f] md:hidden"
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex h-[4.25rem] shrink-0 items-center justify-between px-4">
                    <span className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-white)]">
                      Menu
                    </span>
                    <div className="flex items-center gap-3">
                      <ThemeToggle variant="marketing" />
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                      >
                        <X className="size-7 text-[var(--color-white)]" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-0 overflow-y-auto px-6 py-8 sm:px-8">
                    {LINKS.map((item, i) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i, duration: 0.35 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block border-b border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] py-3 font-body text-xs font-medium uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-silver)_94%,white)] transition-colors hover:text-[var(--color-cyan)]"
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </header>
  );
}
