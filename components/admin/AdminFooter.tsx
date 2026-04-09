import type { ReactElement } from "react";

/**
 * Minimal admin footer: confidentiality notice and compliance hints.
 */
export function AdminFooter(): ReactElement {
  const y = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[#080d18]/90 px-6 py-5 text-center text-[11px] leading-relaxed text-zinc-500">
      <p className="font-medium tracking-wide text-zinc-400">
        Aztran Global Investments · Administration
      </p>
      <p className="mt-1 max-w-2xl mx-auto">
        This environment contains confidential client and business data. Access is audited;
        do not share credentials or export data without authorization.
      </p>
      <p className="mt-2 text-zinc-600">© {y} · reCAPTCHA v3 · Secured session</p>
    </footer>
  );
}
