"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactElement } from "react";
import { cn } from "@/lib/utils";

/** Inner travel for thumb (track 52px, thumb 28px, ~2px inset) */
const THUMB_TRAVEL = 20;

type ThemeToggleProps = {
  variant?: "marketing" | "admin";
  className?: string;
};

/**
 * Animated light/dark toggle: spring thumb travel, icon crossfade, track gradient shift.
 */
export function ThemeToggle({
  variant = "marketing",
  className,
}: ThemeToggleProps): ReactElement {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggle = (): void => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-9 w-[52px] shrink-0 rounded-full",
          variant === "marketing" ? "bg-white/15" : "bg-zinc-800/80",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className={cn(
        "relative h-9 w-[52px] shrink-0 cursor-pointer rounded-full border outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] focus-visible:ring-offset-2",
        variant === "marketing"
          ? "border-[color-mix(in_srgb,var(--color-white)_28%,transparent)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.22)] backdrop-blur-sm focus-visible:ring-offset-[var(--color-navy)]"
          : "border-white/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)] focus-visible:ring-offset-zinc-950",
        className,
      )}
    >
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full"
        initial={false}
        animate={{
          background: isDark
            ? "linear-gradient(135deg, color-mix(in srgb, #0c1222 92%, #22d3ee 8%) 0%, color-mix(in srgb, #001f3f 88%, transparent) 100%)"
            : "linear-gradient(135deg, color-mix(in srgb, #ffffff 50%, #0cc0df 22%) 0%, color-mix(in srgb, #f5f7f6 88%, #0cc0df 14%) 100%)",
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />

      <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center opacity-30">
        <Sun className="size-3 text-amber-100" />
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center opacity-30">
        <Moon className="size-3 text-slate-200" />
      </span>

      <motion.span
        className="absolute top-1 left-0.5 z-10 flex size-7 items-center justify-center rounded-full ring-1 ring-white/30"
        initial={false}
        animate={{
          x: isDark ? 0 : THUMB_TRAVEL,
          backgroundColor: isDark
            ? "color-mix(in srgb, #27272a 94%, #22d3ee 6%)"
            : "color-mix(in srgb, #ffffff 96%, #f59e0b 4%)",
          boxShadow: isDark
            ? "0 0 16px -2px color-mix(in srgb, #22d3ee 40%, transparent), 0 2px 8px rgba(0,0,0,0.35)"
            : "0 0 18px -2px color-mix(in srgb, #f59e0b 50%, transparent), 0 2px 8px rgba(0,0,0,0.15)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.8 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -80, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 80, scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="flex text-cyan-200"
            >
              <Moon className="size-3.5" strokeWidth={2.25} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 80, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -80, scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="flex text-amber-600"
            >
              <Sun className="size-3.5" strokeWidth={2.25} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
