"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import { useUiStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  COMPANY_LEGAL_NAME,
  SITE_LOGO_PATH,
  SITE_LOGO_PATH_ON_DARK,
} from "@/lib/brand";
import {
  ABOUT_NAV,
  INSIGHTS_NAV,
  SERVICES_NAV,
} from "@/lib/site-nav";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type MenuKey = "about" | "services" | "insights";

const HOVER_CLOSE_MS = 160;

function DropdownCardLink({
  href,
  title,
  description,
  emphasize,
  brightChrome,
}: {
  href: string;
  title: string;
  description: string;
  emphasize?: boolean;
  brightChrome: boolean;
}): ReactElement {
  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-xl border border-transparent px-4 py-3 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5",
        brightChrome
          ? "hover:border-[color-mix(in_srgb,var(--color-navy)_12%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-white)_55%,transparent)] dark:hover:border-[color-mix(in_srgb,var(--color-white)_14%,transparent)] dark:hover:bg-[color-mix(in_srgb,var(--color-navy)_55%,transparent)]"
          : "hover:border-[color-mix(in_srgb,var(--color-cyan)_28%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-cyan)_08%,transparent)]",
      )}
    >
      <span
        className={cn(
          "font-body text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors group-hover:text-[var(--color-cyan)] md:text-[12px]",
          emphasize && "font-bold",
          brightChrome
            ? "text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] dark:text-[color-mix(in_srgb,var(--color-offwhite)_92%,transparent)]"
            : "text-[color-mix(in_srgb,var(--color-silver)_96%,white)]",
        )}
      >
        {title}
      </span>
      <span
        className={cn(
          "mt-1 block font-body text-[13px] leading-snug md:text-[14px]",
          brightChrome
            ? "text-[color-mix(in_srgb,var(--color-navy)_62%,transparent)] dark:text-[color-mix(in_srgb,var(--color-silver)_88%,transparent)]"
            : "text-[color-mix(in_srgb,var(--color-silver)_82%,white)]",
        )}
      >
        {description}
      </span>
    </Link>
  );
}

/**
 * Primary public navigation with scroll-aware styling, hover card dropdowns, and mobile overlay.
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

  const [hoverMenu, setHoverMenu] = useState<MenuKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setHoverMenu(null);
    }, HOVER_CLOSE_MS);
  }, [clearCloseTimer]);

  const openMenu = useCallback(
    (key: MenuKey) => {
      clearCloseTimer();
      setHoverMenu(key);
    },
    [clearCloseTimer],
  );

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  type HeaderSurface = "home-top" | "home-scroll" | "dark-glass" | "navy";
  const headerSurface: HeaderSurface = (() => {
    if (!isDarkMode) {
      if (isHome && !isScrolled) return "home-top";
      return "home-scroll";
    }
    if (isHome) {
      if (!isScrolled) return "dark-glass";
      return "navy";
    }
    if (isAboutOrServices && !isScrolled) return "dark-glass";
    return "navy";
  })();

  const brightHomeChrome =
    (headerSurface === "home-top" || headerSurface === "home-scroll") &&
    !isDarkMode;

  const logoSrc = isDarkMode ? SITE_LOGO_PATH_ON_DARK : SITE_LOGO_PATH;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (): void => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const linkClass = cn(
    "group relative inline-flex items-center gap-1 font-body text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 hover:text-[var(--color-cyan)] md:text-[11px] md:tracking-[0.16em]",
    brightHomeChrome
      ? "text-[color-mix(in_srgb,var(--color-navy)_70%,transparent)] dark:text-[color-mix(in_srgb,var(--color-offwhite)_88%,transparent)]"
      : "text-[color-mix(in_srgb,var(--color-silver)_92%,white)]",
  );

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
          <Image
            key={logoSrc}
            src={logoSrc}
            alt={COMPANY_LEGAL_NAME}
            width={960}
            height={288}
            priority
            className="h-[3.875rem] w-auto max-w-[min(90vw,380px)] object-contain object-left sm:max-w-[min(90vw,420px)] md:h-[4.375rem] md:max-w-[min(92vw,500px)] lg:max-w-[min(94vw,580px)]"
          />
          <span className="sr-only">{COMPANY_LEGAL_NAME}</span>
        </Link>
        <div className="hidden items-center gap-3 overflow-visible md:flex md:gap-4 lg:gap-5">
          <div
            className="relative"
            onMouseEnter={() => openMenu("about")}
            onMouseLeave={scheduleClose}
          >
            <Link href="/about" className={linkClass}>
              About
              <ChevronDown
                className={cn(
                  "size-3.5 shrink-0 opacity-80 transition-transform duration-200",
                  hoverMenu === "about" && "rotate-180",
                )}
                aria-hidden
              />
              <span className="nav-underline absolute bottom-[-4px] left-0 h-px w-full origin-left bg-[var(--color-cyan)]" />
            </Link>
            <AnimatePresence>
              {hoverMenu === "about" ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-full z-[100] w-[min(calc(100vw-2rem),22rem)] -translate-x-1/2 pt-3"
                >
                  <div
                    className={cn(
                      "rounded-2xl border p-2 shadow-[0_24px_60px_-24px_rgba(0,31,63,0.45)] backdrop-blur-xl",
                      brightHomeChrome
                        ? "border-[color-mix(in_srgb,var(--color-navy)_12%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_92%,var(--color-offwhite))] dark:border-[color-mix(in_srgb,var(--color-white)_14%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_94%,black)]"
                        : "border-[color-mix(in_srgb,var(--color-cyan)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-navy)_96%,black)]",
                    )}
                  >
                    <div className="max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain pr-1">
                      {ABOUT_NAV.map((item) => (
                        <DropdownCardLink
                          key={item.href}
                          href={item.href}
                          title={item.label}
                          description={item.description}
                          emphasize={item.emphasize}
                          brightChrome={brightHomeChrome}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div
            className="relative"
            onMouseEnter={() => openMenu("services")}
            onMouseLeave={scheduleClose}
          >
            <Link href="/services" className={linkClass}>
              Services
              <ChevronDown
                className={cn(
                  "size-3.5 shrink-0 opacity-80 transition-transform duration-200",
                  hoverMenu === "services" && "rotate-180",
                )}
                aria-hidden
              />
              <span className="nav-underline absolute bottom-[-4px] left-0 h-px w-full origin-left bg-[var(--color-cyan)]" />
            </Link>
            <AnimatePresence>
              {hoverMenu === "services" ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-full z-[100] w-[min(calc(100vw-2rem),20rem)] -translate-x-1/2 pt-3"
                >
                  <div
                    className={cn(
                      "rounded-2xl border p-2 shadow-[0_24px_60px_-24px_rgba(0,31,63,0.45)] backdrop-blur-xl",
                      brightHomeChrome
                        ? "border-[color-mix(in_srgb,var(--color-navy)_12%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_92%,var(--color-offwhite))] dark:border-[color-mix(in_srgb,var(--color-white)_14%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_94%,black)]"
                        : "border-[color-mix(in_srgb,var(--color-cyan)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-navy)_96%,black)]",
                    )}
                  >
                    {SERVICES_NAV.map((item) => (
                      <DropdownCardLink
                        key={item.href}
                        href={item.href}
                        title={item.label}
                        description={item.description}
                        brightChrome={brightHomeChrome}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Portfolio temporarily hidden
          <Link href="/portfolio" className={linkClass}>
            Portfolio
            <span className="nav-underline absolute bottom-[-4px] left-0 h-px w-full origin-left bg-[var(--color-cyan)]" />
          </Link>
          */}

          <div
            className="relative"
            onMouseEnter={() => openMenu("insights")}
            onMouseLeave={scheduleClose}
          >
            <Link href="/insights" className={linkClass}>
              Insights
              <ChevronDown
                className={cn(
                  "size-3.5 shrink-0 opacity-80 transition-transform duration-200",
                  hoverMenu === "insights" && "rotate-180",
                )}
                aria-hidden
              />
              <span className="nav-underline absolute bottom-[-4px] left-0 h-px w-full origin-left bg-[var(--color-cyan)]" />
            </Link>
            <AnimatePresence>
              {hoverMenu === "insights" ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-full z-[100] w-[min(calc(100vw-2rem),20rem)] pt-3 md:left-1/2 md:right-auto md:-translate-x-1/2"
                >
                  <div
                    className={cn(
                      "rounded-2xl border p-2 shadow-[0_24px_60px_-24px_rgba(0,31,63,0.45)] backdrop-blur-xl",
                      brightHomeChrome
                        ? "border-[color-mix(in_srgb,var(--color-navy)_12%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_92%,var(--color-offwhite))] dark:border-[color-mix(in_srgb,var(--color-white)_14%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_94%,black)]"
                        : "border-[color-mix(in_srgb,var(--color-cyan)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-navy)_96%,black)]",
                    )}
                  >
                    {INSIGHTS_NAV.map((item) => (
                      <DropdownCardLink
                        key={item.href}
                        href={item.href}
                        title={item.label}
                        description={item.description}
                        brightChrome={brightHomeChrome}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <Link href="/contact" className={linkClass}>
            Contact
            <span className="nav-underline absolute bottom-[-4px] left-0 h-px w-full origin-left bg-[var(--color-cyan)]" />
          </Link>

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
      {mounted ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="left"
            showCloseButton={false}
            overlayClassName="z-[200] bg-[color-mix(in_srgb,black_55%,transparent)] supports-backdrop-filter:backdrop-blur-sm md:hidden"
            className={cn(
              "z-[201] flex h-full max-h-dvh w-full flex-col gap-0 border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] bg-[#001f3f] p-0 text-[var(--color-offwhite)] shadow-[8px_0_48px_-12px_rgba(0,0,0,0.45)] md:hidden",
              "data-[side=left]:w-full data-[side=left]:max-w-[min(100vw-0.5rem,22rem)] data-[side=left]:sm:max-w-[min(100vw-0.5rem,22rem)]",
            )}
          >
            <SheetHeader className="space-y-0 border-b border-[color-mix(in_srgb,var(--color-cyan)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-navy)_88%,black)] p-4 pr-14">
              <div className="flex items-center gap-3">
                <Image
                  src={SITE_LOGO_PATH_ON_DARK}
                  alt=""
                  width={280}
                  height={84}
                  className="h-9 w-auto object-contain object-left opacity-95"
                />
                <SheetTitle className="sr-only">Site navigation</SheetTitle>
              </div>
              <SheetDescription className="mt-2 font-body text-[11px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-silver)_82%,var(--color-offwhite))]">
                Menu
              </SheetDescription>
              <SheetClose
                className="absolute top-3.5 right-3 flex size-10 items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--color-white)_16%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_06%,transparent)] font-body text-[var(--color-cyan)] transition-[background-color,color,transform] hover:bg-[color-mix(in_srgb,var(--color-cyan)_14%,transparent)] hover:text-[var(--color-offwhite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#001f3f]"
                aria-label="Close menu"
              >
                <X className="size-5" strokeWidth={1.75} />
              </SheetClose>
            </SheetHeader>

            <nav
              className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-2 py-2"
              aria-label="Primary mobile"
            >
              <MobileNavGroup
                title="About"
                onNavigate={() => setOpen(false)}
                items={ABOUT_NAV.map((i) => ({
                  href: i.href,
                  label: i.label,
                  description: i.description,
                  emphasize: i.emphasize,
                }))}
              />
              <MobileNavGroup
                title="Services"
                onNavigate={() => setOpen(false)}
                items={SERVICES_NAV.map((i) => ({
                  href: i.href,
                  label: i.label,
                  description: i.description,
                }))}
              />
              <MobileNavGroup
                title="Insights"
                onNavigate={() => setOpen(false)}
                items={[
                  {
                    href: "/insights",
                    label: "All insights",
                    description: "Full research library and filters.",
                  },
                  ...INSIGHTS_NAV.map((i) => ({
                    href: i.href,
                    label: i.label,
                    description: i.description,
                  })),
                ]}
              />

              <div className="mt-1 space-y-1 px-1 pb-2">
                {(
                  [
                    // { href: "/portfolio", label: "Portfolio" },
                    { href: "/contact", label: "Contact" },
                  ] as const
                ).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-xl border border-[color-mix(in_srgb,var(--color-white)_10%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_04%,transparent)] px-3 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-offwhite)] transition-[border-color,background-color,color] hover:border-[color-mix(in_srgb,var(--color-cyan)_45%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-cyan)_10%,transparent)] hover:text-[var(--color-cyan)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <SheetFooter className="gap-3 border-t border-[color-mix(in_srgb,var(--color-cyan)_22%,transparent)] bg-[color-mix(in_srgb,black_25%,#001f3f)] p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-body text-[10px] font-medium uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-silver)_75%,transparent)]">
                  Appearance
                </span>
                <ThemeToggle variant="marketing" />
              </div>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex h-11 w-full items-center justify-center rounded-sm border border-[var(--color-cyan)] bg-[var(--color-cyan)] font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)] shadow-[0_8px_28px_-10px_color-mix(in_srgb,var(--color-cyan)_45%,transparent)] transition-[filter,transform] hover:brightness-105 active:scale-[0.99]"
              >
                Get in Touch
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : null}
    </header>
  );
}

type MobileNavItem = {
  href: string;
  label: string;
  description?: string;
  emphasize?: boolean;
};

function MobileNavGroup({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: readonly MobileNavItem[];
  onNavigate: () => void;
}): ReactElement {
  const [sectionOpen, setSectionOpen] = useState(false);
  return (
    <Collapsible
      open={sectionOpen}
      onOpenChange={setSectionOpen}
      className="border-b border-[color-mix(in_srgb,var(--color-white)_10%,transparent)]"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-3.5 text-left font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-offwhite)] outline-none transition-colors hover:text-[var(--color-cyan)] focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#001f3f] data-[state=open]:text-[var(--color-cyan)]">
        <span className="flex items-center gap-2">
          <span
            className={cn(
              "h-1 w-1 shrink-0 rounded-full bg-[var(--color-cyan)] transition-opacity",
              sectionOpen ? "opacity-100" : "opacity-60",
            )}
            aria-hidden
          />
          {title}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-[var(--color-cyan)] transition-transform duration-200",
            sectionOpen && "rotate-180",
          )}
          aria-hidden
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[ending-style]:h-0 data-[starting-style]:h-0 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
        <ul className="space-y-1 border-l border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] pb-3 pl-3 ml-2 mr-1 mt-0.5">
          {items.map((item) => (
            <li key={`${item.href}-${item.label}`}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "block rounded-r-lg rounded-tl-sm py-2.5 pl-2 pr-2 transition-[background-color,color]",
                  "hover:bg-[color-mix(in_srgb,var(--color-cyan)_08%,transparent)]",
                  item.emphasize &&
                    "font-bold text-[var(--color-offwhite)]",
                )}
              >
                <span
                  className={cn(
                    "font-body text-[13px] leading-snug text-[var(--color-offwhite)]",
                    !item.emphasize &&
                      "font-medium text-[color-mix(in_srgb,var(--color-offwhite)_96%,white)]",
                  )}
                >
                  {item.label}
                </span>
                {item.description ? (
                  <span className="mt-0.5 block font-body text-[12px] leading-relaxed text-[color-mix(in_srgb,var(--color-silver)_72%,var(--color-offwhite))]">
                    {item.description}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
