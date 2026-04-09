import Link from "next/link";
import type { ReactElement } from "react";

/**
 * Server-safe primary CTA styled consistently with the admin shell.
 */
export function AdminPrimaryLink({
  href,
  children,
}: {
  href: string;
  children: string;
}): ReactElement {
  return (
    <Link
      href={href}
      className="inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary px-2.5 text-sm font-medium text-primary-foreground outline-none transition-all hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {children}
    </Link>
  );
}
