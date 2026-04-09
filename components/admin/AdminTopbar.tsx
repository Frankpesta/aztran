import type { ReactElement, ReactNode } from "react";

/**
 * Sticky admin page header with title line and optional actions.
 */
export function AdminTopbar({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}): ReactElement {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0c1222]/85 px-4 py-4 backdrop-blur-md md:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400/90">
            Administration
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-white md:text-2xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-zinc-400">
              {subtitle}
            </p>
          ) : null}
        </div>
        {action ? <div className="flex shrink-0 flex-wrap gap-2">{action}</div> : null}
      </div>
    </header>
  );
}
