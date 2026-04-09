"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactElement } from "react";
import { Menu, X } from "lucide-react";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import { useUiStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
  const transparentHero =
    pathname === "/" || pathname === "/about" || pathname === "/services";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500",
        isScrolled || !transparentHero
          ? "border-b border-[color-mix(in_srgb,var(--color-cyan)_28%,transparent)] bg-[var(--color-navy-95)] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-[var(--color-navy)]/35 via-transparent to-transparent",
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-container items-center justify-between px-4 md:px-8"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-display text-lg tracking-[0.28em] text-[var(--color-white)] transition-[letter-spacing,opacity] duration-500 hover:tracking-[0.32em] hover:opacity-95 md:text-xl"
        >
          AZTRAN GLOBAL
        </Link>
        <div className="hidden items-center gap-6 md:flex md:gap-8">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative font-body text-label uppercase tracking-widest text-[color-mix(in_srgb,var(--color-silver)_92%,white)] transition-colors duration-300 hover:text-[var(--color-cyan)]"
            >
              {item.label}
              <span className="nav-underline absolute bottom-[-6px] left-0 h-px w-full origin-left bg-[var(--color-cyan)]" />
            </Link>
          ))}
          <ThemeToggle variant="marketing" />
          <Link
            href="/contact"
            className="rounded-sm border border-[var(--color-cyan)] bg-[color-mix(in_srgb,var(--color-cyan)_10%,transparent)] px-4 py-2 font-body text-label uppercase tracking-widest text-[var(--color-cyan)] backdrop-blur-sm transition-[transform,background-color,color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-cyan)] hover:text-[var(--color-navy)] hover:shadow-[0_0_32px_-6px_var(--color-cyan)]"
          >
            Get in Touch
          </Link>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle variant="marketing" />
          <button
            type="button"
            className="inline-flex text-[var(--color-white)]"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-7" />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 flex flex-col bg-[var(--color-navy)] md:hidden"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-16 items-center justify-between px-4">
              <span className="font-display text-lg tracking-[0.2em] text-[var(--color-white)]">
                MENU
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
            <div className="flex flex-1 flex-col gap-2 px-8 py-10">
              {LINKS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-[color-mix(in_srgb,var(--color-silver)_25%,transparent)] py-4 font-body text-lg uppercase tracking-[0.2em] text-[var(--color-silver)]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
